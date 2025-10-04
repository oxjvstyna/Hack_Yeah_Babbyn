import primaryColors from "../colors";
import { fontFamily, fontSize, paddingSize } from "../vars";
import { StyleSheet } from "react-native";

import { generalStyle } from "./generalStyles";

export const mainStyle = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: primaryColors.lightGrey,
    backgroundColor: primaryColors.surface,
  },
  scrollView: {
    paddingVertical: paddingSize.medium,
    paddingHorizontal: paddingSize.mediumBig,
    rowGap: paddingSize.medium,
    paddingBottom: paddingSize.xxBig,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: primaryColors.primary,
    color: primaryColors.primary,
    fontFamily: fontFamily.playball,
    fontSize: fontSize.xFontSize,
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
