import { generalStyle } from "@/properties/styles/generalStyles";
import { mainStyle } from "@/properties/styles/mainStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Switch,
  Image,
} from "react-native";
import { useState } from "react";

export default function TabTwoScreen() {
  const [notifications, setNotifications] = useState(true);

  return (
    <SafeAreaView edges={["top"]} style={mainStyle.safeArea}>
      <ScrollView
        style={mainStyle.scrollView}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 60,
        }}
      >
        {/* Header */}
        <Text
          style={[
            generalStyle.headerText,
            { marginTop: 10, marginBottom: 10, fontSize: 28 },
          ]}
        >
          Settings
        </Text>

        <View
          style={{
            height: 1,
            backgroundColor: "#fffbf6",
            marginBottom: 20,
          }}
        />

        {/* Account Section */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#023047",
            marginBottom: 10,
          }}
        >
          Account
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          {/* Profile Image */}
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=5" }} // ← tu można podmienić na zdjęcie użytkownika z backendu
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              borderWidth: 2,
              borderColor: "#1A7F99",
              marginRight: 15,
            }}
          />

          {/* Buttons (narrowed to the right) */}
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#1A7F99",
                paddingVertical: 12,
                borderRadius: 15,
                marginBottom: 10,
                alignSelf: "flex-end",
                width: "80%",
              }}
            >
              <Text
                style={[
                  generalStyle.basicText,
                  { color: "#fff", textAlign: "center" },
                ]}
              >
                Edit Profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "#1A7F99",
                paddingVertical: 12,
                borderRadius: 15,
                alignSelf: "flex-end",
                width: "80%",
              }}
            >
              <Text
                style={[
                  generalStyle.basicText,
                  { color: "#fff", textAlign: "center" },
                ]}
              >
                Change Password
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Preferences Section */}
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
            borderRadius: 15,
            marginBottom: 30,
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

        {/* About Section */}
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

        <TouchableOpacity
          style={{
            backgroundColor: "#1A7F99",
            paddingVertical: 15,
            paddingHorizontal: 20,
            borderRadius: 15,
            marginBottom: 10,
          }}
        >
          <Text style={[generalStyle.basicText, { color: "#fff" }]}>
            Privacy Policy
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#1A7F99",
            paddingVertical: 15,
            paddingHorizontal: 20,
            borderRadius: 15,
          }}
        >
          <Text style={[generalStyle.basicText, { color: "#fff" }]}>
            Terms of Service
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
