import { generalStyle } from "@/properties/styles/generalStyles";
import { mainStyle } from "@/properties/styles/mainStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, Switch, Image } from "react-native";
import { useState } from "react";
import Button from "@/components/Button";
import { paddingSize } from "@/properties/vars";

export default function TabTwoScreen() {
  const [notifications, setNotifications] = useState(true);

  return (
    <SafeAreaView edges={["top"]} style={mainStyle.safeArea}>
      <Text style={mainStyle.header}>Settings</Text>
      <ScrollView contentContainerStyle={mainStyle.scrollView}>
        <View>
          <Text
            style={{
              fontSize: 16,
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
              <Button variant={"secondary"} title={"Change password"}></Button>
            </View>
          </View>
        </View>

        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#003344",
              marginBottom: 10,
            }}
          >
            Preferences
          </Text>

          <View
            style={{
              backgroundColor: "#1A7F99",
              borderRadius: 25,
              paddingHorizontal: 20,
              paddingVertical: 15,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={[generalStyle.basicText, { color: "#fff" }]}>
              Notifications
            </Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: "#cdd6d9", true: "#2e9db9ff" }}
            />
          </View>
        </View>

        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#003344",
              marginBottom: 10,
            }}
          >
            About
          </Text>
          <View style={{ rowGap: paddingSize.small }}>
            <Button
              variant={"secondaryOutline"}
              title={"Privacy Policy"}
            ></Button>
            <Button
              variant={"secondaryOutline"}
              title={"Terms of Service"}
            ></Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
