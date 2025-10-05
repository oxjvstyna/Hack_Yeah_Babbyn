// api.ts

export const BASE_URL = "http://172.20.10.4:8080";
const userId = 1;

export type CountryRating = {
  id: number;
  funRating: number | null;
  securityRating: number | null;
};

export type UserRatingsResponse = {
  id: number;
  placeIds: number[];
  friendIds: number[];
  countryRatings: CountryRating[];
};

export type Place = {
  id?: number;
  date?: string;
  name: string;
  photo: string; // base64 (bez/ze wstępem data:)
};

export type PlacesServerResponse = {
  securityRating: number | null;
  funRating: number | null;
  placesPerUser: Record<string, Place[]>; // <-- klucz: userId jako string
};

// to zwrócimy do UI (już spłaszczone)
export type CountryPlacesResponse = {
  securityRating: number | null;
  funRating: number | null;
  places: Place[];
};

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

export async function funRating(
  iso: string,
  rating: number
): Promise<UserRatingsResponse> {
  if (!/^[A-Z]{3}$/.test(iso)) {
    throw new Error(
      "Invalid ISO code (expected ISO 3166-1 alpha-3, e.g. 'POL')."
    );
  }
  if (!Number.isFinite(rating) || rating < 0 || rating > 5) {
    throw new Error("Invalid rating (expected number 0..5).");
  }

  console.log(rating);

  const url = new URL(`${BASE_URL}/user/${userId}/funRating`);
  url.searchParams.set("countryIso", iso);
  url.searchParams.set("rating", String(rating));

  const r = await fetch(url.toString(), {
    method: "POST",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!r.ok) {
    const msg = await r.text().catch(() => "");
    throw new Error(`HTTP ${r.status}${msg ? ` – ${msg}` : ""}`);
  }

  if (r.status === 204) {
    return { id: userId, placeIds: [], friendIds: [], countryRatings: [] };
  }

  const data: unknown = await r.json();

  const isNullableNumber = (x: unknown): x is number | null =>
    x === null || typeof x === "number";

  if (!data || typeof data !== "object") {
    throw new Error("Invalid payload: expected object.");
  }

  const d = data as Partial<UserRatingsResponse>;
  if (
    typeof d.id !== "number" ||
    !Array.isArray(d.placeIds) ||
    !Array.isArray(d.friendIds) ||
    !Array.isArray(d.countryRatings)
  ) {
    throw new Error(
      "Invalid payload: expected { id:number, placeIds:number[], friendIds:number[], countryRatings:[] }."
    );
  }

  for (const cr of d.countryRatings) {
    if (
      !cr ||
      typeof cr !== "object" ||
      typeof (cr as any).id !== "number" ||
      !("funRating" in cr) ||
      !("securityRating" in cr) ||
      !isNullableNumber((cr as any).funRating) ||
      !isNullableNumber((cr as any).securityRating)
    ) {
      throw new Error("Invalid payload: malformed countryRatings item.");
    }
  }

  return d as UserRatingsResponse;
}

export async function secRating(
  iso: string,
  rating: number
): Promise<UserRatingsResponse> {
  if (!/^[A-Z]{3}$/.test(iso)) {
    throw new Error(
      "Invalid ISO code (expected ISO 3166-1 alpha-3, e.g. 'POL')."
    );
  }
  if (!Number.isFinite(rating) || rating < 0 || rating > 5) {
    throw new Error("Invalid rating (expected number 0..5).");
  }

  console.log(rating);

  const url = new URL(`${BASE_URL}/user/${userId}/secRating`);
  url.searchParams.set("countryIso", iso);
  url.searchParams.set("rating", String(rating));

  const r = await fetch(url.toString(), {
    method: "POST",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!r.ok) {
    const msg = await r.text().catch(() => "");
    throw new Error(`HTTP ${r.status}${msg ? ` – ${msg}` : ""}`);
  }

  if (r.status === 204) {
    return { id: userId, placeIds: [], friendIds: [], countryRatings: [] };
  }

  const data: unknown = await r.json();

  const isNullableNumber = (x: unknown): x is number | null =>
    x === null || typeof x === "number";

  if (!data || typeof data !== "object") {
    throw new Error("Invalid payload: expected object.");
  }

  const d = data as Partial<UserRatingsResponse>;
  if (
    typeof d.id !== "number" ||
    !Array.isArray(d.placeIds) ||
    !Array.isArray(d.friendIds) ||
    !Array.isArray(d.countryRatings)
  ) {
    throw new Error(
      "Invalid payload: expected { id:number, placeIds:number[], friendIds:number[], countryRatings:[] }."
    );
  }

  for (const cr of d.countryRatings) {
    if (
      !cr ||
      typeof cr !== "object" ||
      typeof (cr as any).id !== "number" ||
      !("funRating" in cr) ||
      !("securityRating" in cr) ||
      !isNullableNumber((cr as any).funRating) ||
      !isNullableNumber((cr as any).securityRating)
    ) {
      throw new Error("Invalid payload: malformed countryRatings item.");
    }
  }

  return d as UserRatingsResponse;
}

export async function getUserPlacesByCountry(
  iso: string,
  userId = 1
): Promise<CountryPlacesResponse> {
  if (!/^[A-Z]{3}$/.test(iso)) {
    throw new Error("Invalid ISO code (expected ISO 3166-1 alpha-3).");
  }

  const url = new URL(`${BASE_URL}/user/places/${userId}`);
  url.searchParams.set("countryIso", iso);

  const r = await fetch(url.toString(), {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!r.ok) {
    const msg = await r.text().catch(() => "");
    throw new Error(`HTTP ${r.status}${msg ? ` – ${msg}` : ""}`);
  }
  if (r.status === 204)
    return { securityRating: null, funRating: null, places: [] };

  const data: unknown = await r.json();

  const isPlace = (x: any): x is Place =>
    x &&
    typeof x === "object" &&
    typeof x.name === "string" &&
    typeof x.photo === "string" &&
    (x.id === undefined || typeof x.id === "number") &&
    (x.date === undefined || typeof x.date === "string");

  if (!data || typeof data !== "object") throw new Error("Invalid payload.");
  const d = data as Partial<PlacesServerResponse>;
  const map = d.placesPerUser;

  if (
    (d.securityRating !== null && typeof d.securityRating !== "number") ||
    (d.funRating !== null && typeof d.funRating !== "number") ||
    !map ||
    typeof map !== "object"
  ) {
    throw new Error("Invalid payload shape.");
  }

  let places: Place[] = [];
  const all = Object.values(map).flatMap((v) =>
    Array.isArray(v) ? v : []
  ) as unknown[];
  places = all.filter(isPlace) as Place[];

  return {
    securityRating: d.securityRating ?? null,
    funRating: d.funRating ?? null,
    places,
  };
}
