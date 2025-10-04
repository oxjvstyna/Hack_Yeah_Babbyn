import primaryColors from "../colors";
import { fontSize, paddingSize } from "../vars";
import { StyleSheet } from "react-native";

import { generalStyle } from "./generalStyles";

export const mainStyle = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: primaryColors.lightGrey,
    backgroundColor: primaryColors.surface,
  },
  scrollView: {
    // backgroundColor: primaryColors.darkBlue,
    // paddingHorizontal: paddingSize.medium,
    // paddingVertical: paddingSize.mediumBig,
    // rowGap: paddingSize.mediumBig,
  },
});

export const navbarStyle = StyleSheet.create({
  container: {
    paddingHorizontal: paddingSize.medium,
    paddingVertical: paddingSize.mediumBig,
    backgroundColor: primaryColors.white,
    ...generalStyle.rowSpread,
  },
  text: {
    fontSize: fontSize.h2FontSize,
    color: primaryColors.darkBlue,
  },
  navbarDescription: {
    paddingHorizontal: paddingSize.medium,
    paddingVertical: paddingSize.mediumBig,
    backgroundColor: primaryColors.darkBlue,
    ...generalStyle.rowSpread,
    alignItems: "center",
  },
  navbarDescriptionTitle: {},
  navbarDescriptionText: {
    fontSize: fontSize.titleFontSize,
    color: primaryColors.white,
    lineHeight: fontSize.h2FontSize,
  },
  navbarDescriptionSubtitleText: {
    fontSize: fontSize.baseFontSize,
    color: primaryColors.white,
  },
});
