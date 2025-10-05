// api.ts

export const BASE_URL = "http://172.20.10.4:8080";
const userId = 1;

export async function getCountries(): Promise<string[]> {
  const r = await fetch(`${BASE_URL}/user/${userId}/countries`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!r.ok) throw new Error(`HTTP ${r.status}`);

  if (r.status === 204) return [];

  const data = await r.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid payload: expected an array.");
  }
  for (const v of data) {
    if (typeof v !== "string") {
      throw new Error("Invalid payload: expected string[] items.");
    }
  }

  return data;
}

export async function postCountry(iso: string, was: boolean) {
  if (!/^[A-Z]{3}$/.test(iso)) {
    throw new Error(
      "Invalid ISO code (expected ISO 3166-1 alpha-3, e.g. 'POL')."
    );
  }

  const url = new URL(`${BASE_URL}/user/${userId}/country`);
  url.searchParams.set("countryIso", iso);

  const method = was ? "POST" : "DELETE";

  const r = await fetch(url.toString(), {
    method: method,
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!r.ok) {
    const msg = await r.text().catch(() => "");
    throw new Error(`HTTP ${r.status}${msg ? ` – ${msg}` : ""}`);
  }
}
