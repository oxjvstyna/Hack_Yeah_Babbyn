import React from "react";
import Star from "./Star";
import { View, Text, Image, ScrollView } from "react-native";

export default function ModalMyTripsTab({ styles, ...props }) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Star title="My fun rating" />
      <Star title="My security rating" />
      <Text style={styles.sectionTitle}>My Gallery</Text>
      <View style={styles.galleryGrid}>
        {[1, 2, 3].map((id) => (
          <Image
            key={id}
            source={require("@/assets/images/aa.png")}
            style={styles.galleryImage}
            resizeMode="cover"
          />
        ))}
      </View>
    </ScrollView>
  );
}
