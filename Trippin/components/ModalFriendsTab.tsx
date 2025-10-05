import React from "react";
import { View, Text, Image, ScrollView } from "react-native";

export default function ModalFriendsTab({ styles, ...props }) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Friends who visited</Text>
      <CountryFriends friends={[]} styles={styles} />
      <Text style={styles.sectionTitle}>Friends gallery</Text>
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

function CountryFriends({ friends, styles, ...props }) {
  return (
    <View style={styles.friendContainer}>
      {[1, 2, 3].map((id) => (
        <Image
          key={id}
          source={require("@/assets/images/aa.png")}
          style={styles.friendImage}
          resizeMode="cover"
        />
      ))}
    </View>
  );
}
