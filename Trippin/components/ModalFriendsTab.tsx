import React from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import type { Place } from "@/hooks/api";

type Props = {
  styles: any;
  placesByUser: Record<string, Place[]>;
  names: Record<string, string>;
  userPhotos: Record<string, string>;
  currentUserId: number; // np. 1
};

const toDataUri = (b64: string) =>
  b64.startsWith("data:image") ? b64 : `data:image/jpeg;base64,${b64}`;

export default function ModalFriendsTab({
  styles,
  placesByUser,
  currentUserId,
  userPhotos,
  names,
}: Props) {
  console.log(names);
  // tylko inni niż bieżący użytkownik i tylko sekcje, które mają zdjęcia
  const otherEntries = Object.entries(placesByUser).filter(
    ([uid, arr]) =>
      uid !== String(currentUserId) && Array.isArray(arr) && arr.length > 0
  );

  // lista „kto był” (do rzędu avatarów/identyfikatorów)
  const friends = otherEntries.map(([uid, arr]) => ({
    uid,
    count: arr.length,
  }));

  // wszystkie zdjęcia znajomych (niespłaszczone do jednego użytkownika, ale jedna galeria)
  const photos = otherEntries.flatMap(([uid, arr]) =>
    arr.map((p, i) => ({
      uid,
      place: p,
      key: `u${uid}-${p.id ?? `${p.name}-${p.date ?? ""}-${i}`}`,
    }))
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Friends who visited</Text>
      <CountryFriends
        friends={friends}
        styles={styles}
        userPhotos={userPhotos}
      />

      <Text style={styles.sectionTitle}>Friends gallery</Text>
      <View style={styles.galleryGrid}>
        {photos.flatMap(({ uid, place }, i) =>
          (place.photo ?? []).map((b64, j) => {
            const uri = toDataUri(b64); // zwróci data:... albo undefined
            if (!uri) return null;

            return (
              <ImageBackground
                key={`u${uid}-${place.id ?? i}-img-${j}`}
                source={{ uri }}
                style={[styles.galleryImage, local.imgContainer]} // kontener kafelka
                imageStyle={local.img} // tylko borderRadius
                resizeMode="cover"
              >
                <View style={local.badge}>
                  <Text style={local.badgeText}>
                    {names?.[uid] ?? `User ${uid}`}
                  </Text>
                </View>
              </ImageBackground>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}

function CountryFriends({
  friends,
  styles,
  userPhotos,
}: {
  friends: { uid: string; count: number }[];
  styles: any;
  userPhotos: Record<string, string>;
}) {
  const toDataUri = (b64: string, mime = "image/jpeg") =>
    b64.startsWith("data:") ? b64 : `data:${mime};base64,${b64}`;
  if (friends.length === 0) {
    return <Text style={{ opacity: 0.6 }}>No friends’ photos yet.</Text>;
  }
  return (
    <View style={styles.friendContainer}>
      {friends.map((f) => (
        <View key={f.uid} style={styles.friendImage}>
          <Image
            key={`profile-${f.uid}`}
            source={{ uri: toDataUri(userPhotos[f.uid]) }}
            style={[
              styles.galleryImage,
              { height: "100%", width: "100%", borderRadius: 40 },
            ]}
            resizeMode="cover"
          />
        </View>
      ))}
    </View>
  );
}

const local = StyleSheet.create({
  imgContainer: {
    overflow: "hidden",
  },
  img: {
    borderRadius: 10,
    width: "100%",
  },
  badge: {
    position: "absolute",
    left: 8,
    top: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  badgeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },
  friendIdText: {
    color: "#0B2239",
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 40, // dopasuj do styles.friendImage.height
  },
});
