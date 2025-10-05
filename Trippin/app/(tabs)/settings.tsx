import { generalStyle } from "@/properties/styles/generalStyles";
import { mainStyle } from "@/properties/styles/mainStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, Switch, Image } from "react-native";
import { useState } from "react";
import Button from "@/components/Button";
import { paddingSize } from "@/properties/vars";
import primaryColors from "@/properties/colors";

export default function TabTwoScreen() {
  const pictures = [
    { id: 1, picture: require("@/assets/images/gosia.jpg") },
    {
      id: 2,
      picture: require("@/assets/images/oliwia.jpeg"),
    },
    {
      id: 3,
      picture: require("@/assets/images/ola.jpeg"),
    },
    {
      id: 4,
      picture: require("@/assets/images/wera.jpeg"),
    },
    {
      id: 5,
      picture: require("@/assets/images/ada.jpeg"),
    },
    {
      id: 6,
      picture: require("@/assets/images/justyna.jpeg"),
    },
    {
      id: 7,
      picture: require("@/assets/images/asia.jpg"),
    },
  ];
  return (
    <SafeAreaView edges={["top"]} style={mainStyle.safeArea}>
      <Text style={mainStyle.header}>Profile</Text>
      <ScrollView contentContainerStyle={mainStyle.scrollView}>
        <View style={{ rowGap: 10 }}>
          <View style={{ flexDirection: "row", columnGap: 5 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: primaryColors.textDark,
              }}
            >
              Friends
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: primaryColors.darkGrey,
              }}
            >
              | 21
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              columnGap: 5,
              justifyContent: "space-between",
            }}
          >
            {pictures.map((profilePicture) => (
              <>
                <Image
                  key={profilePicture.id}
                  source={profilePicture.picture}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                  }}
                />
              </>
            ))}
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <View style={{ width: 120 }}>
              <Button variant="secondary" title="See all"></Button>
            </View>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: "#023047",
            }}
          >
            Account
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=5" }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                borderWidth: 2,
                borderColor: "#1A7F99",
                marginRight: 15,
              }}
            />

            <View style={{ flex: 1, rowGap: paddingSize.small }}>
              <Button variant={"secondary"} title={"Edit profile"}></Button>
              <Button
                variant={"secondaryOutline"}
                title={"Preferences"}
              ></Button>
            </View>
          </View>
        </View>

        <View>
          <View style={{ rowGap: paddingSize.small }}>
            <Button variant={"secondaryOutline"} title={"Privacy"}></Button>
            <Button variant={"secondaryOutline"} title={"Terms"}></Button>
            <Button
              variant={"secondary"}
              title={"Delete account"}
              color="#D73D3D"
            ></Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
