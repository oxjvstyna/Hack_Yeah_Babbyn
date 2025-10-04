import { Tabs } from "expo-router";
import React from "react";
import { View, StyleSheet } from "react-native";
import { HapticTab } from "@/components/haptic-tab";
import primaryColors from "@/properties/colors";
import Icon from "react-native-vector-icons/Feather";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarButton: HapticTab,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: primaryColors.darkGrey,
        tabBarInactiveTintColor: primaryColors.lightGrey,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrap}>
              <Icon name="map" size={26} color={color} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrap}>
              <Icon name="grid" size={26} color={color} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrap}>
              <Icon name="user" size={26} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    marginLeft: 20,
    marginRight: 20,
    bottom: 20,
    height: 54,
    borderRadius: 28,
    backgroundColor: primaryColors.surface,
    borderTopWidth: 0,
    shadowColor: primaryColors.surfaceDark,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
    elevation: 12,
    paddingHorizontal: 24,
  },
  tabBarItem: {
    marginTop: 8,
  },
  iconWrap: {
    height: 44,
    width: 64,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
});
