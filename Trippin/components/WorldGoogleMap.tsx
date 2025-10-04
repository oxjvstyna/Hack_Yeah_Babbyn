// components/WorldGoogleMap.tsx
import React, { useMemo, useState, useCallback } from "react";
import MapView, { PROVIDER_GOOGLE, Polygon, Region } from "react-native-maps";
import { View, StyleSheet } from "react-native";
import world from "@/assets/countries.min.json";
import CountryInfoModal from "@/components/CountryInfoModal";

type Position = [number, number];
type LinearRing = Position[];
type PolygonCoords = LinearRing[];
type MultiPolygonCoords = PolygonCoords[];

type Geometry =
  | { type: "Polygon"; coordinates: PolygonCoords }
  | { type: "MultiPolygon"; coordinates: MultiPolygonCoords };

type Feature = {
  type: "Feature";
  properties: {
    name?: string;
    "ISO3166-1-Alpha-3"?: string;
  };
  geometry: Geometry | null;
};

type FeatureCollection = { type: "FeatureCollection"; features: Feature[] };
type LatLng = { latitude: number; longitude: number };
type RNPolygon = {
  outer: LatLng[];
  holes: LatLng[][];
  iso?: string;
  name?: string;
  bbox: { minLat: number; maxLat: number; minLng: number; maxLng: number }; // ✅ do filtrowania
};

const p2ll = ([lng, lat]: Position): LatLng => ({
  latitude: lat,
  longitude: lng,
});

function bboxOfCoords(coords: LatLng[]): RNPolygon["bbox"] {
  let minLat = 90,
    maxLat = -90,
    minLng = 180,
    maxLng = -180;
  for (const p of coords) {
    if (p.latitude < minLat) minLat = p.latitude;
    if (p.latitude > maxLat) maxLat = p.latitude;
    if (p.longitude < minLng) minLng = p.longitude;
    if (p.longitude > maxLng) maxLng = p.longitude;
  }
  return { minLat, maxLat, minLng, maxLng };
}

function toRNPolygons(feature: Feature): RNPolygon[] {
  const { geometry, properties } = feature;
  if (!geometry) return [];

  const iso = properties["ISO3166-1-Alpha-3"];
  const name = properties.name;

  const toOne = (poly: PolygonCoords): RNPolygon => {
    const [outer, ...holes] = poly;
    const outerLL = (outer || []).map(p2ll);
    return {
      outer: outerLL,
      holes: (holes || []).map((ring) => ring.map(p2ll)),
      iso,
      name,
      bbox: bboxOfCoords(outerLL),
    };
  };

  return geometry.type === "Polygon"
    ? [toOne(geometry.coordinates)]
    : geometry.coordinates.map(toOne);
}

function intersects(region: Region, bbox: RNPolygon["bbox"], pad = 5): boolean {
  const minLat = region.latitude - region.latitudeDelta / 2 - pad;
  const maxLat = region.latitude + region.latitudeDelta / 2 + pad;
  const minLng = region.longitude - region.longitudeDelta / 2 - pad;
  const maxLng = region.longitude + region.longitudeDelta / 2 + pad;
  return !(
    bbox.maxLat < minLat ||
    bbox.minLat > maxLat ||
    bbox.maxLng < minLng ||
    bbox.minLng > maxLng
  );
}

export default function WorldGoogleMap() {
  const [selectedIso, setSelectedIso] = useState<string | null>(null);
  const [region, setRegion] = useState<Region>({
    latitude: 20,
    longitude: 0,
    latitudeDelta: 150,
    longitudeDelta: 360,
  });

  // ✅ przelicz raz, trzymaj w pamięci
  const { polygons, byIso } = useMemo(() => {
    const fc = world as FeatureCollection;
    const polys: RNPolygon[] = [];
    const index = new Map<string, string>(); // ISO -> NAME

    for (const f of fc.features) {
      const iso = f.properties["ISO3166-1-Alpha-3"] ?? "";
      const name = f.properties.name ?? "";
      if (iso && name) index.set(iso, name);
      polys.push(...toRNPolygons(f));
    }
    return { polygons: polys, byIso: index };
  }, []);

  // ✅ renderuj tylko widoczne polygon
  const visiblePolys = useMemo(
    () => polygons.filter((p) => intersects(region, p.bbox, 5)),
    [polygons, region]
  );

  const onRegionChangeComplete = useCallback((r: Region) => setRegion(r), []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        onRegionChangeComplete={onRegionChangeComplete} // ✅
        showsCompass={false}
        showsUserLocation={false}
        rotateEnabled={false}
      >
        {visiblePolys.map((p, idx) => {
          const isSelected = p.iso && p.iso === selectedIso;
          return (
            <Polygon
              key={idx}
              coordinates={p.outer}
              holes={p.holes}
              tappable
              strokeWidth={isSelected ? 2 : 1}
              strokeColor={
                isSelected ? "rgba(220,38,38,1)" : "rgba(15,23,42,0.7)"
              }
              fillColor={
                isSelected ? "rgba(220,38,38,1)" : "rgba(14,165,233,0.25)"
              }
              onPress={() => setSelectedIso(isSelected ? null : p.iso ?? null)}
            />
          );
        })}
      </MapView>

      <CountryInfoModal
        visible={!!selectedIso}
        name={selectedIso ? byIso.get(selectedIso) ?? selectedIso : ""}
        onClose={() => setSelectedIso(null)}
      />
    </View>
  );
}
