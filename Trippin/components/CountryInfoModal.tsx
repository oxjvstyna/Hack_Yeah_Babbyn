import { fontFamily, fontSize, paddingSize } from "@/properties/vars";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Star from "./Star";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import primaryColors from "@/properties/colors";
import ModalMyTripsTab from "@/components/ModalMyTripsTab";
import ModalFriendsTab from "@/components/ModalFriendsTab";
import Button from "./Button";

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
  const [selectedTab, setSelectedTab] = useState<"trips" | "friends">("trips");
  const [isVisited, setIsVisited] = useState<boolean>(false);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose} />

      <View style={styles.sheet}>
        {/* <ScrollView
          style={{ flexGrow: 0 }}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        > */}
        {/* Header */}
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

        {/* Divider */}
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 1,
            marginVertical: 8,
          }}
        />

        <Button title={isVisited ? "You've been here!" : "I was here"} variant={isVisited ?  "secondary" : "secondaryOutline"} onPress={() => setIsVisited(true)}></Button>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            onPress={() => setSelectedTab("trips")}
            style={styles.tabItem}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "trips" ? styles.tabActive : null,
              ]}
            >
              My Trips
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedTab("friends")}
            style={styles.tabItem}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "friends" ? styles.tabActive : null,
              ]}
            >
              Friends
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {selectedTab === "friends" ? (
          <ModalFriendsTab styles={styles} />
        ) : (
          <ModalMyTripsTab styles={styles} />
        )}

        {/* Close Button */}
        {/* <Pressable style={styles.cta} onPress={onClose}>
          <Text style={styles.ctaText}>Close</Text>
        </Pressable> */}
        {/* </ScrollView> */}
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
    maxHeight: "80%",
    paddingBottom: 30,
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
  container: {
    padding: 20,
  },
  mapText: {
    position: "absolute",
    top: 20,
    left: 20,
    color: "#fff",
    fontWeight: "600",
  },
  beenThereButton: {
    backgroundColor: "#397C8D",
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    width: "100%",
  },
  beenThereButtonOutlined: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#397C8D",
  },
  beenThereText: {
    color: "#fff",
    fontStyle: "italic",
    fontSize: 16,
  },
  beenThereTextOutlined: {
    color: "#397C8D",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  tabItem: {
    paddingVertical: 8,
    width: "45%",
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
    color: "#1E3D58",
    fontStyle: "italic",
    textAlign: "center",
    paddingBottom: 4,
    width: "100%",
  },
  tabActive: {
    color: "#397C8D",
    borderBottomWidth: 1,
    borderColor: "#397C8D",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0B2239",
    marginTop: 20,
    marginBottom: 10,
  },
  friendsRow: {
    flexDirection: "row",
    gap: 10,
  },
  friendCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#D9D9D9",
  },
  galleryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  galleryImage: {
    width: "48%",
    height: 180,
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
  },
  ratingBox: {
    width: "100%",
    height: 60,
    borderRadius: 10,
    backgroundColor: "#EAF2F5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 24,
    color: "#397C8D",
  },
});
