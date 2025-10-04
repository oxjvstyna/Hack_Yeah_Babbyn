import primaryColors from "../colors";
import { fontSize } from "../vars";
import { Platform, StatusBar, StyleSheet } from "react-native";

export const generalStyle = StyleSheet.create({
  shadow: {
    shadowColor: primaryColors.surfaceDark,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },
  basicText: {
    color: primaryColors.white,
    fontSize: fontSize.baseFontSize,
  },
  errorText: {
    color: primaryColors.red,
    fontSize: fontSize.baseFontSize,
  },
  smallText: {
    color: primaryColors.darkGrey,
    fontSize: fontSize.smallFontSize,
  },
  titleText: {
    fontSize: fontSize.titleFontSize,
    color: primaryColors.darkBlue,
  },
  keyText: {
    fontSize: fontSize.baseFontSize,
    color: primaryColors.darkBlue,
  },
  secondaryTitle: {
    fontSize: fontSize.secondaryTitleFontSize,
    color: primaryColors.darkBlue,
  },
  rowSpread: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  safeArea: {
    flex: 1,
    backgroundColor: primaryColors.babyBlue,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
