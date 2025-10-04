import React from "react";
import { Modal, Pressable, View, Text, StyleSheet } from "react-native";

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
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.sheet}>
        <Text style={styles.title}>{name ?? ""}</Text>
        {children ?? (
          <Text style={styles.text}>
            Tu wstaw dane o kraju: opis, zdjęcia, linki, CTA…
          </Text>
        )}
        <Pressable style={styles.cta} onPress={onClose}>
          <Text style={styles.ctaText}>Close</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)" },
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
  title: { fontSize: 18, fontWeight: "600" },
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
