import { useState } from "react";
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { mainStyle } from "@/properties/styles/mainStyles";
import { generalStyle } from "@/properties/styles/generalStyles";

export default function TabTwoScreen() {
  const [selectedTab, setSelectedTab] = useState<"trips" | "friends">("trips");

  return (
    // <SafeAreaView
    //   style={{ flex: 1, backgroundColor: "#FFFBF6" }}
    //   edges={["top", "bottom"]}
    // >
    //   <StatusBar style="dark" backgroundColor="transparent" translucent />

    //   <ScrollView contentContainerStyle={styles.container}>
    //     {/* --- Tytuł kraju --- */}
    //     <Text style={styles.title}>Poland</Text>

    //     {/* --- Przycisk "You've been there" / "I was here" --- */}
    //     <View
    //       style={[
    //         styles.beenThereButton,
    //         selectedTab === "trips" && styles.beenThereButtonOutlined,
    //       ]}
    //     >
    //       <Text
    //         style={[
    //           styles.beenThereText,
    //           selectedTab === "trips" && styles.beenThereTextOutlined,
    //         ]}
    //       >
    //         {selectedTab === "trips" ? "I was here" : "You’ve been there!"}
    //       </Text>
    //     </View>

    //     {/* --- Zakładki My Trips / Friends --- */}
    //     <View style={styles.tabsContainer}>
    //       <TouchableOpacity
    //         onPress={() => setSelectedTab("trips")}
    //         style={styles.tabItem}
    //       >
    //         <Text
    //           style={[
    //             styles.tabText,
    //             selectedTab === "trips" ? styles.tabActive : null,
    //           ]}
    //         >
    //           My Trips
    //         </Text>
    //       </TouchableOpacity>

    //       <TouchableOpacity
    //         onPress={() => setSelectedTab("friends")}
    //         style={styles.tabItem}
    //       >
    //         <Text
    //           style={[
    //             styles.tabText,
    //             selectedTab === "friends" ? styles.tabActive : null,
    //           ]}
    //         >
    //           Friends
    //         </Text>
    //       </TouchableOpacity>
    //     </View>

    //     {/* --- WIDOK ZALEŻNY OD ZAKŁADKI --- */}
    //     {selectedTab === "friends" ? (
    //       <>
    //         {/* --- Sekcja Friends who visited --- */}
    //         <Text style={styles.sectionTitle}>Friends who visited</Text>
    //         <View style={styles.friendsRow}>
    //           {[...Array(5)].map((_, i) => (
    //             <View key={i} style={styles.friendCircle} />
    //           ))}
    //         </View>

    //         {/* --- Sekcja Friend Gallery --- */}
    //         <Text style={styles.sectionTitle}>Friend Gallery</Text>
    //         <View style={styles.galleryGrid}>
    //           {[1, 2, 3].map((id) => (
    //             <Image
    //               key={id}
    //               source={require("@/assets/images/aa.png")}
    //               style={styles.galleryImage}
    //               resizeMode="cover"
    //             />
    //           ))}
    //         </View>
    //       </>
    //     ) : (
    //       <>
    //         {/* --- Sekcja My Fun Rating --- */}
    //         <Text style={styles.sectionTitle}>My Fun Rating</Text>
    //         <View style={styles.ratingBox}>
    //           <Text style={styles.ratingText}>⭐⭐⭐⭐☆</Text>
    //         </View>

    //         {/* --- Sekcja My Security Rating --- */}
    //         <Text style={styles.sectionTitle}>My Security Rating</Text>
    //         <View style={styles.ratingBox}>
    //           <Text style={styles.ratingText}>⭐⭐⭐☆☆</Text>
    //         </View>

    //         {/* --- Sekcja My Gallery --- */}
    //         <Text style={styles.sectionTitle}>My Gallery</Text>
    //         <View style={styles.galleryGrid}>
    //           {[1, 2, 3].map((id) => (
    //             <Image
    //               key={id}
    //               source={require("@/assets/images/aa.png")}
    //               style={styles.galleryImage}
    //               resizeMode="cover"
    //             />
    //           ))}
    //         </View>
    //       </>
    //     )}
    <SafeAreaView edges={["top"]} style={mainStyle.safeArea}>
      <ScrollView style={mainStyle.scrollView}>
        <Text style={generalStyle.basicText}>Inny ekran</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: "600",
    fontFamily: "serif",
    marginBottom: 10,
    color: "#0B2239",
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
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderColor: "#A1C4D2",
    marginBottom: 20,
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
  },
  tabActive: {
    color: "#397C8D",
    borderBottomWidth: 2,
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
