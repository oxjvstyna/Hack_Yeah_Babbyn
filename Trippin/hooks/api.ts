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

export type PlacesResponse = {
  securityRating: number | null;
  funRating: number | null;
  placesPerUser: Record<string, unknown[]>;
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
  iso: string
): Promise<PlacesResponse> {
  if (!/^[A-Z]{3}$/.test(iso)) {
    throw new Error(
      "Invalid ISO code (expected ISO 3166-1 alpha-3, e.g. 'RUS')."
    );
  }

  const url = new URL(`${BASE_URL}/user/places/${userId}`);
  url.searchParams.set("countryIso", iso);

  console.log(url);

  const r = await fetch(url.toString(), {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!r.ok) {
    const msg = await r.text().catch(() => "");
    throw new Error(`HTTP ${r.status}${msg ? ` – ${msg}` : ""}`);
  }

  // 204 No Content → zwróć pusty, ale poprawnie ukształtowany obiekt
  if (r.status === 204) {
    const key = String(userId);
    return {
      securityRating: null,
      funRating: null,
      placesPerUser: { [key]: [] },
    };
  }

  const data: unknown = await r.json();

  console.log(data);

  if (!data || typeof data !== "object") {
    throw new Error("Invalid payload: expected object.");
  }
  const d = data as Partial<PlacesResponse>;

  const isNumOrNull = (x: unknown): x is number | null =>
    x === null || typeof x === "number";

  const isRecordOfArrays = (x: unknown): x is Record<string, unknown[]> => {
    if (!x || typeof x !== "object") return false;
    for (const v of Object.values(x as Record<string, unknown>)) {
      if (!Array.isArray(v)) return false;
    }
    return true;
  };

  if (
    !isNumOrNull(d.securityRating) ||
    !isNumOrNull(d.funRating) ||
    !isRecordOfArrays(d.placesPerUser)
  ) {
    throw new Error(
      "Invalid payload: expected { securityRating:number|null, funRating:number|null, placesPerUser: Record<string, unknown[]> }."
    );
  }

  return d as PlacesResponse;
}
