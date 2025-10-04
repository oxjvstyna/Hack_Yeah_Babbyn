import WorldGoogleMap from "@/components/WorldGoogleMap";
import { generalStyle } from "@/properties/styles/generalStyles";
import { mainStyle } from "@/properties/styles/mainStyles";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={mainStyle.safeArea}>
      {/* <ScrollView style={mainStyle.scrollView}> */}

      <WorldGoogleMap />

      <Text style={generalStyle.basicText}>Babbynnn for win</Text>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}
