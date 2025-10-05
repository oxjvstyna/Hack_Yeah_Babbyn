import React, { useState } from "react";
import Star from "./Star";
import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import { mainStyle } from "@/properties/styles/mainStyles";
import { paddingSize } from "@/properties/vars";
export default function ModalMyTripsTab({ styles, ...props }) {
  const [uploaded, setUploaded] = useState<string[]>([]);

  const pickImages = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert("Permission needed", "Allow photo library access to upload.");
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // iOS 14+ / Android 13+ (w starszych wybierzesz 1)
      quality: 0.85,
    });
    if (!res.canceled) {
      const uris = res.assets.map((a) => a.uri);
      setUploaded((prev) => [...uris, ...prev]); // nowe foty tuż za kafelkiem
      // TODO: wyślij na backend, jeśli masz endpoint (upload S3 itp.)
    }
  };

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

        {/* 2) Wgrane zdjęcia użytkownika */}
        {uploaded.map((uri) => (
          <Image
            key={uri}
            source={{ uri }}
            style={styles.galleryImage}
            resizeMode="cover"
          />
        ))}

        {/* 3) Twoje dotychczasowe placeholdery / zdjęcia */}
        {[1, 2, 3].map((id) => (
          <Image
            key={`ph-${id}`}
            source={require("@/assets/images/aa.png")}
            style={styles.galleryImage}
            resizeMode="cover"
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
