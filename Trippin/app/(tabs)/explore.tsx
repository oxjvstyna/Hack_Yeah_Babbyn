import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { mainStyle } from "@/properties/styles/mainStyles";
import primaryColors from "@/properties/colors";
import { generalStyle } from "@/properties/styles/generalStyles";

const posts = [
  {
    id: 1,
    username: "alex_travels",
    trip: "Rome, Italy 🇮🇹",
    image: require("@/assets/images/aa.png"),
    caption: "Such a beautiful city full of history!",
    daysAgo: "3 days ago",
  },
  {
    id: 2,
    username: "marta.world",
    trip: "Tokyo, Japan 🇯🇵",
    image: require("@/assets/images/aa.png"),
    caption: "Cherry blossoms were absolutely stunning 🌸",
    daysAgo: "5 days ago",
  },
  {
    id: 3,
    username: "johnny_explorer",
    trip: "Reykjavik, Iceland 🇮🇸",
    image: require("@/assets/images/aa.png"),
    caption: "Hot springs and northern lights ❄️🔥",
    daysAgo: "1 week ago",
  },
];

export default function FriendActivityScreen() {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLikedPosts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <SafeAreaView style={mainStyle.safeArea}>
      <Text style={mainStyle.header}>Friend Activity</Text>

      {/* Content */}
      <ScrollView contentContainerStyle={mainStyle.scrollView}>
        {posts.map((post) => (
          <View key={post.id} style={styles.card}>
            <Text style={styles.daysAgo}>{post.daysAgo}</Text>

            <View style={styles.row}>
              <View style={styles.avatarPlaceholder} />
              <Text style={styles.activityText}>
                {post.username} has been to {post.trip}
              </Text>
            </View>

            <Image source={post.image} style={styles.postImage} />

            <TouchableOpacity onPress={() => toggleLike(post.id)}>
              <Text style={styles.likeButton}>
                {likedPosts.includes(post.id) ? "❤️" : "🤍"}
              </Text>
            </TouchableOpacity>

            <Text style={styles.caption}>{post.caption}</Text>
          </View>
        ))}

        {/* Pagination */}
        <View style={styles.pagination}>
          <Text style={[styles.page, styles.activePage]}>1</Text>
          <Text style={styles.page}>2</Text>
          <Text style={styles.page}>...</Text>
          <Text style={styles.page}>67</Text>
          <Text style={styles.page}>68</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: "Georgia",
    fontStyle: "italic",
    color: "#001F2D",
  },
  card: {
    backgroundColor: primaryColors.surface,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: primaryColors.gray,
    ...generalStyle.shadow,
  },
  daysAgo: { fontSize: 12, color: "#555", marginBottom: 8 },
  row: { flexDirection: "row", alignItems: "center" },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#D9D9D9",
    marginRight: 8,
  },
  activityText: { fontSize: 15, color: "#001F2D" },
  postImage: {
    height: 150,
    width: "100%",
    borderRadius: 8,
    marginVertical: 8,
    resizeMode: "cover",
  },
  likeButton: { fontSize: 24, marginBottom: 5 },
  caption: { fontSize: 14, color: "#333" },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  page: { marginHorizontal: 4, color: "#001F2D" },
  activePage: {
    backgroundColor: "#007C91",
    color: "#FFF",
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#FFF",
  },
});
