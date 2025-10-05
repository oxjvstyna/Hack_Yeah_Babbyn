import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

interface ButtonProps {
  variant: "secondary" | "secondaryOutline";
  title: string;
  onPress?: () => void;
  color?: string;
}

const variantStyles = StyleSheet.create({
  secondary: {
    backgroundColor: "#197B91",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
  },
  secondaryOutline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#197B91",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
  },
  textSecondary: {
    color: "#fff",
    fontSize: 16,
  },
  textOutline: {
    color: "#197B91",
    fontSize: 16,
  },
});

export default function Button({
  variant,
  title,
  onPress,
  color,
}: ButtonProps) {
  const isOutline = variant === "secondaryOutline";

  return (
    <TouchableOpacity
      style={
        isOutline
          ? variantStyles.secondaryOutline
          : [variantStyles.secondary, color && { backgroundColor: color }]
      }
      onPress={onPress}
    >
      <Text
        style={
          isOutline ? variantStyles.textOutline : variantStyles.textSecondary
        }
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
