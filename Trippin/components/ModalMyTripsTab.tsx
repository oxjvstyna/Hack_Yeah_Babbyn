import React, { useState } from "react";
import Star from "./Star";
import {
  View,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import AntDesign from "@expo/vector-icons/AntDesign";
import { paddingSize } from "@/properties/vars";
import { Place } from "@/hooks/api";
type Props = {
  styles: any;
  iso: string;
  ratingFun: number;
  ratingSec: number;
  places: Place[];
};
export default function ModalMyTripsTab({ styles, places, ...props }: Props) {
  const [uploaded, setUploaded] = useState<string[]>([]);

  async function pickImages() {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Permission needed", "Allow photo library access to upload.");
      return;
    }

    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.85,
      base64: true, // najpierw spróbuj dostać base64 z pickera
      exif: false,
    });

    if (res.canceled) return;

    const items = await Promise.all(
      res.assets.map(async (a, i) => {
        const b64 =
          a.base64 ??
          (await FileSystem.readAsStringAsync(a.uri, {
            encoding: "base64",
          }));

        const mime = a.mimeType ?? "image/jpeg";
        return {
          uri: a.uri,
          base64: b64,
          dataUri: toDataUri(b64, mime),
          mimeType: mime,
          name: a.fileName ?? `img_${Date.now()}_${i}.jpg`,
        };
      })
    );

    // np. do podglądu
    setUploaded((prev) => [...items.map((it) => it.dataUri), ...prev]);

    // albo do wysyłki na backend:
    // await upload(items.map(({ name, mimeType, base64 }) => ({ name, mimeType, base64 })));
  }

  const toDataUri = (b64: string, mime = "image/jpeg") =>
    b64.startsWith("data:") ? b64 : `data:${mime};base64,${b64}`;

  return (
    <ScrollView
      contentContainerStyle={{ rowGap: paddingSize.medium }}
      showsVerticalScrollIndicator={false}
    >
      <Star
        title="My fun rating"
        iso={props.iso}
        ratingStart={props.ratingFun}
        isFun={true}
      />
      <Star
        title="My security rating"
        iso={props.iso}
        ratingStart={props.ratingSec}
        isFun={false}
      />
      <View style={styles.galleryGrid}>
        {/* 1) Kafelek uploadu jako „pierwsze zdjęcie” */}
        <TouchableOpacity
          onPress={pickImages}
          activeOpacity={0.8}
          style={[styles.galleryImage, local.uploadTile]}
        >
          <AntDesign name="plus" size={36} color="#1E7A8C" />
        </TouchableOpacity>

        {uploaded.map((uri) => (
          <Image
            key={`upl-${uri}`}
            source={{ uri }}
            style={styles.galleryImage}
            resizeMode="cover"
          />
        ))}
        {places.map((p) => (
          <Image
            key={`place-${p.id}`}
            source={{ uri: toDataUri(p.photo) }}
            style={styles.galleryImage}
            resizeMode="cover"
            accessible
            accessibilityLabel={p.name || `Photo ${p.id}`}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const local = StyleSheet.create({
  uploadTile: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#1E7A8C", // ten turkus z Twojego zrzutu
    borderRadius: 10, // dopasuj do styles.galleryImage
  },
});
