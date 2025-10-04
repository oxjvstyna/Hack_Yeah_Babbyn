import { fontFamily, fontSize, paddingSize } from "@/properties/vars";
import React, { useState } from "react";
import { Modal, Pressable, View, Text, StyleSheet } from "react-native";
import Star from "./Star";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import primaryColors from "@/properties/colors";

type CountryInfoModalProps = {
  visible: boolean;
  name?: string;
  onClose: () => void;
  children?: React.ReactNode;
};

export default function CountryInfoModal({
  visible,
  name,
  onClose,
  children,
}: CountryInfoModalProps) {
  const [rating, setRating] = useState<number>(0);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.sheet}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.title}>{name ?? ""}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 16,
            }}
          >
            {/* ❤️ HEART + liczba */}
            <View style={{ position: "relative" }}>
              <AntDesign name="heart" size={fontSize.xFontSize} color="black" />
              <Text
                style={{
                  position: "absolute",
                  top: 8,
                  left: 6.5,
                  color: primaryColors.lightText,
                  fontSize: fontSize.smallFontSize,
                  fontWeight: "700",
                }}
              >
                5.0
              </Text>
            </View>
            <View style={{ position: "relative" }}>
              <FontAwesome6
                name="shield"
                size={fontSize.xFontSize}
                color="black"
              />
              <Text
                style={{
                  position: "absolute",
                  top: 9,
                  left: 6.5,
                  color: primaryColors.lightText,
                  fontSize: fontSize.smallFontSize,
                  fontWeight: "700",
                }}
              >
                3.2
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 1,
          }}
        />

        {children ?? <Text style={styles.text}>Blablabla</Text>}

        <Star title="My fun rating" />
        <Star title="My security rating" />
        <Pressable style={styles.cta} onPress={onClose}>
          <Text style={styles.ctaText}>Close</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1 },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    gap: 8,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  title: {
    fontSize: fontSize.xFontSize,
    fontWeight: "600",
    fontFamily: fontFamily.playball,
  },
  text: { opacity: 0.8 },
  cta: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#0ea5e9",
    marginTop: 8,
  },
  ctaText: { color: "white", fontWeight: "600" },
});
