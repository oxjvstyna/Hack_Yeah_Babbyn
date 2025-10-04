#!/usr/bin/env bash
set -euo pipefail

# =======================
# Konfiguracja (zmienialna przez ENV)
# =======================
NAME="${NAME:-pg}"                             # nazwa kontenera Postgres
NETWORK="${NETWORK:-app-net}"                  # sieć dockerowa dla PG i Flyway
DB_NAME="${DB_NAME:-travelapp}"                # nazwa bazy
PG_USER="${PG_USER:-postgres}"                 # użytkownik
PG_PASSWORD="${PG_PASSWORD:-yourpassword}"     # hasło
HOST_PORT="${HOST_PORT:-5432}"                 # port na hoście (np. 5432/5433)
PG_IMAGE="${PG_IMAGE:-postgres:16}"            # obraz Postgresa
FLYWAY_IMAGE="${FLYWAY_IMAGE:-flyway/flyway:10}"  # obraz Flyway
MIGRATIONS_DIR="${MIGRATIONS_DIR:-src/main/resources/db/migration}" # lokalizacja migracji
REPAIR="${REPAIR:-false}"                      # true -> najpierw flyway repair

log()  { printf "\033[1;32m[INFO]\033[0m %s\n" "$*"; }
warn() { printf "\033[1;33m[WARN]\033[0m %s\n" "$*"; }
err()  { printf "\033[1;31m[ERR ]\033[0m %s\n" "$*" >&2; }

# =======================
# Pre-checki
# =======================
command -v docker >/dev/null || { err "Brak 'docker' w PATH."; exit 1; }
[ -d "$MIGRATIONS_DIR" ] || { err "Nie znaleziono migracji pod: $MIGRATIONS_DIR"; exit 1; }

# Jeśli port zajęty i to 5432, spróbuj 5433
if (command -v lsof >/dev/null 2>&1 && lsof -i :"$HOST_PORT" >/dev/null) || nc -z 127.0.0.1 "$HOST_PORT" >/dev/null 2>&1; then
  if [[ "$HOST_PORT" == "5432" ]]; then
    warn "Port 5432 zajęty → przełączam na 5433."
    HOST_PORT=5433
  else
    err "Port $HOST_PORT zajęty. Ustaw inny przez HOST_PORT=...."
    exit 1
  fi
fi

# =======================
# Sieć dla kontenerów
# =======================
if ! docker network ls --format '{{.Name}}' | grep -qx "$NETWORK"; then
  log "Tworzę sieć: $NETWORK"
  docker network create "$NETWORK" >/dev/null
fi

# =======================
# Postgres
# =======================
if docker ps -a --format '{{.Names}}' | grep -qx "$NAME"; then
  if ! docker ps --format '{{.Names}}' | grep -qx "$NAME"; then
    log "Startuję istniejący kontener '$NAME'…"
    docker start "$NAME" >/dev/null
  else
    log "Kontener '$NAME' już działa."
  fi
else
  log "Uruchamiam Postgresa: $NAME ($PG_IMAGE) na porcie $HOST_PORT"
  docker run --name "$NAME" \
    --network "$NETWORK" \
    -e POSTGRES_USER="$PG_USER" \
    -e POSTGRES_PASSWORD="$PG_PASSWORD" \
    -e POSTGRES_DB="$DB_NAME" \
    -p "${HOST_PORT}:5432" \
    -d "$PG_IMAGE" >/dev/null
fi

# =======================
# Czekaj aż PG będzie gotowy
# =======================
log "Czekam na gotowość Postgresa…"
for i in {1..60}; do
  if docker exec "$NAME" pg_isready -U "$PG_USER" >/dev/null 2>&1; then
    break
  fi
  sleep 1
done
docker exec "$NAME" pg_isready -U "$PG_USER" >/dev/null 2>&1 || {
  err "Postgres nie wstał w ~60s. Podgląd logów:"
  docker logs "$NAME" | tail -n 50 >&2 || true
  exit 1
}
log "Postgres gotowy."

# Doprecyzuj DB (gdyby nie powstał z ENV)
if ! docker exec -e PGPASSWORD="$PG_PASSWORD" -it "$NAME" \
  psql -U "$PG_USER" -tAc "SELECT 1 FROM pg_database WHERE datname='${DB_NAME}'" | grep -q 1; then
  log "Tworzę bazę '${DB_NAME}'…"
  docker exec -e PGPASSWORD="$PG_PASSWORD" -it "$NAME" \
    psql -U "$PG_USER" -c "CREATE DATABASE ${DB_NAME};" >/dev/null
fi

# =======================
# Flyway migrate (z katalogu migracji)
# =======================
log "Uruchamiam migracje Flyway z: $MIGRATIONS_DIR"
FLYWAY_URL="jdbc:postgresql://$NAME:5432/${DB_NAME}"

FLYWAY_CMD=(docker run --rm
  --network "$NETWORK"
  -v "$(cd "$MIGRATIONS_DIR" && pwd)":/flyway/sql:ro
  "$FLYWAY_IMAGE"
  -url="$FLYWAY_URL"
  -user="$PG_USER"
  -password="$PG_PASSWORD"
  -locations=filesystem:/flyway/sql
  -connectRetries=60
)

if [[ "$REPAIR" == "true" ]]; then
  log "Wykonuję flyway repair…"
  "${FLYWAY_CMD[@]}" repair
fi

log "Wykonuję flyway migrate…"
"${FLYWAY_CMD[@]}" migrate

log "✅ Baza gotowa i zmigrowana."
log "postgres://$PG_USER:$PG_PASSWORD@localhost:$HOST_PORT/$DB_NAME"
