#!/usr/bin/env bash
set -euo pipefail

NAME="${NAME:-pg}"                 # nazwa kontenera
DB_NAME="${DB_NAME:-travelapp}"    # nazwa bazy tworzona przy starcie
PG_USER="${PG_USER:-postgres}"     # użytkownik
PG_PASSWORD="${PG_PASSWORD:-yourpassword}"  # hasło
HOST_PORT="${HOST_PORT:-5432}"     # port na hoście
IMAGE="${IMAGE:-postgres:16}"      # obraz Postgresa

echo "[INFO] Usuwam istniejący kontener (jeśli jest)..."
docker rm -fv "$NAME" >/dev/null 2>&1 || true

echo "[INFO] Startuję świeży Postgres: $NAME ($IMAGE) na porcie $HOST_PORT"
docker run --name "$NAME" \
  -e POSTGRES_USER="$PG_USER" \
  -e POSTGRES_PASSWORD="$PG_PASSWORD" \
  -e POSTGRES_DB="$DB_NAME" \
  -p "${HOST_PORT}:5432" \
  -d "$IMAGE" >/dev/null

echo "[INFO] Czekam aż Postgres będzie gotowy..."
for i in {1..30}; do
  if docker exec "$NAME" pg_isready -U "$PG_USER" >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

echo "[OK] Postawione. Connection string:"
echo "postgres://$PG_USER:$PG_PASSWORD@localhost:$HOST_PORT/$DB_NAME"
