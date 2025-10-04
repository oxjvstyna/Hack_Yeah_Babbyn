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
import WorldGoogleMap from "@/components/WorldGoogleMap";
import { generalStyle } from "@/properties/styles/generalStyles";
import { mainStyle } from "@/properties/styles/mainStyles";

export default function HomeScreen() {
  const [selectedTab, setSelectedTab] = useState<"trips" | "friends">("trips");

  return (
    // <SafeAreaView style={[mainStyle.safeArea, { backgroundColor: "#FFFBF6" }]}>
    //   <StatusBar style="dark" backgroundColor="transparent" translucent />

    //   <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
    //     {/* --- MAPA --- */}
    //     <View style={{ height: 400 }}>
    //       <WorldGoogleMap />
    //     </View>

    //     <Text style={[generalStyle.basicText, styles.mapText]}>
    //       Babbynnn for win
    //     </Text>

    //     {/* --- Tytuł kraju --- */}
    //     <View style={styles.container}>
    //       <Text style={styles.title}>Poland</Text>

    //       {/* --- Przycisk "You've been there" / "I was here" --- */}
    //       <View
    //         style={[
    //           styles.beenThereButton,
    //           selectedTab === "trips" && styles.beenThereButtonOutlined,
    //         ]}
    //       >
    //         <Text
    //           style={[
    //             styles.beenThereText,
    //             selectedTab === "trips" && styles.beenThereTextOutlined,
    //           ]}
    //         >
    //           {selectedTab === "trips" ? "I was here" : "You’ve been there!"}
    //         </Text>
    //       </View>

    //       {/* --- Zakładki My Trips / Friends --- */}
    //       <View style={styles.tabsContainer}>
    //         <TouchableOpacity
    //           onPress={() => setSelectedTab("trips")}
    //           style={styles.tabItem}
    //         >
    //           <Text
    //             style={[
    //               styles.tabText,
    //               selectedTab === "trips" ? styles.tabActive : null,
    //             ]}
    //           >
    //             My Trips
    //           </Text>
    //         </TouchableOpacity>

    //         <TouchableOpacity
    //           onPress={() => setSelectedTab("friends")}
    //           style={styles.tabItem}
    //         >
    //           <Text
    //             style={[
    //               styles.tabText,
    //               selectedTab === "friends" ? styles.tabActive : null,
    //             ]}
    //           >
    //             Friends
    //           </Text>
    //         </TouchableOpacity>
    //       </View>

    //       {/* --- WIDOK ZALEŻNY OD ZAKŁADKI --- */}
    //       {selectedTab === "friends" ? (
    //         <>
    //           {/* --- Sekcja Friends who visited --- */}
    //           <Text style={styles.sectionTitle}>Friends who visited</Text>
    //           <View style={styles.friendsRow}>
    //             {[...Array(5)].map((_, i) => (
    //               <View key={i} style={styles.friendCircle} />
    //             ))}
    //           </View>

    //           {/* --- Sekcja Friend Gallery --- */}
    //           <Text style={styles.sectionTitle}>Friend Gallery</Text>
    //           <View style={styles.galleryGrid}>
    //             {[1, 2, 3].map((id) => (
    //               <Image
    //                 key={id}
    //                 source={require("@/assets/images/aa.png")}
    //                 style={styles.galleryImage}
    //                 resizeMode="cover"
    //               />
    //             ))}
    //           </View>
    //         </>
    //       ) : (
    //         <>
    //           {/* --- Sekcja My Fun Rating --- */}
    //           <Text style={styles.sectionTitle}>My Fun Rating</Text>
    //           <View style={styles.ratingBox}>
    //             <Text style={styles.ratingText}>⭐⭐⭐⭐☆</Text>
    //           </View>

    //           {/* --- Sekcja My Security Rating --- */}
    //           <Text style={styles.sectionTitle}>My Security Rating</Text>
    //           <View style={styles.ratingBox}>
    //             <Text style={styles.ratingText}>⭐⭐⭐☆☆</Text>
    //           </View>

    //           {/* --- Sekcja My Gallery --- */}
    //           <Text style={styles.sectionTitle}>My Gallery</Text>
    //           <View style={styles.galleryGrid}>
    //             {[1, 2, 3].map((id) => (
    //               <Image
    //                 key={id}
    //                 source={require("@/assets/images/aa.png")}
    //                 style={styles.galleryImage}
    //                 resizeMode="cover"
    //               />
    //             ))}
    //           </View>
    //         </>
    //       )}
    //     </View>
    //   </ScrollView>
    <SafeAreaView style={mainStyle.safeArea} edges={["top"]}>
      {/* <ScrollView style={mainStyle.scrollView}> */}

      <WorldGoogleMap />
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}
