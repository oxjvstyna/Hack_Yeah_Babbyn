import { generalStyle } from "@/properties/styles/generalStyles";
import { mainStyle } from "@/properties/styles/mainStyles";
import { Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  return (
    <SafeAreaView edges={["top"]} style={mainStyle.safeArea}>
      <ScrollView style={mainStyle.scrollView}>
        <Text style={generalStyle.basicText}>Inny ekran</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
