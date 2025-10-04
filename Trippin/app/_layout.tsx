import { Stack } from "expo-router";
import "react-native-reanimated";
import { useFonts } from "@expo-google-fonts/playball/useFonts";
import { Playball_400Regular } from "@expo-google-fonts/playball/400Regular";

export default function RootLayout() {
  let [fontsLoaded] = useFonts({
    Playball_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  } else {
    return <Stack screenOptions={{ headerShown: false }} />;
  }
}
