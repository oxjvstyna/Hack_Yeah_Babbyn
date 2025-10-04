// components/WorldGoogleMap.tsx
import React, { useMemo, useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Polygon } from "react-native-maps";
import { View, StyleSheet } from "react-native";
import world from "@/assets/countries.min.json";
import CountryInfoModal from "@/components/CountryInfoModal";
import primaryColors from "@/properties/colors";

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

const darkStyle = [
  { elementType: "geometry", stylers: [{ color: primaryColors.countryFill }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8b949e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0f0f10" }] },
  {
    featureType: "administrative",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "water", stylers: [{ color: primaryColors.water }] },
];

export default function WorldGoogleMap() {
  const [ready, setReady] = useState(false);
  const [selectedIso, setSelectedIso] = useState<string | null>(null);

  const highlightedCountries = ["POL", "DEU", "ESP", "USA"];

  const { polygons, byIso } = useMemo(() => {
    const fc = world as FeatureCollection;
    const polys: RNPolygon[] = [];
    const index = new Map<string, string>();
    for (const f of fc.features) {
      const iso = f.properties["ISO3166-1-Alpha-3"] ?? "";
      const name = f.properties.name ?? "";
      if (iso && name) index.set(iso, name);
      polys.push(...toRNPolygons(f));
    }
    return { polygons: polys, byIso: index };
  }, []);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return <View style={{ flex: 1, backgroundColor: "#0b1220" }} />;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: 10,
          longitude: 19,
          latitudeDelta: 155,
          longitudeDelta: 45,
        }}
        showsCompass={false}
        provider={PROVIDER_GOOGLE}
        customMapStyle={darkStyle}
        rotateEnabled={false}
        loadingEnabled
        loadingIndicatorColor="#0ea5e9"
      >
        {polygons.map((p, idx) => {
          const isSelected = p.iso && p.iso === selectedIso;
          const isHighlighted = p.iso && highlightedCountries.includes(p.iso); // 💚

          let fillColor = primaryColors.countryFill;
          let strokeColor = primaryColors.countryOutline;

          if (isHighlighted) {
            fillColor = "rgba(34,197,94,0.5)";
            strokeColor = "rgba(22,163,74,1)";
          }

          if (isSelected) {
            fillColor = "rgba(239,68,68,0.45)";
            strokeColor = "rgba(239,68,68,1)";
          }

          return (
            <Polygon
              key={idx}
              coordinates={p.outer}
              holes={p.holes}
              tappable
              strokeWidth={isSelected ? 2 : 1}
              strokeColor={strokeColor}
              fillColor={fillColor}
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
