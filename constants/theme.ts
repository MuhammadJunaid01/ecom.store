import { Dimensions } from "react-native";
import tw from "twrnc";
const screen = Dimensions.get("screen");
import {
  scale,
  moderateScale,
  moderateVerticalScale,
  verticalScale,
} from "react-native-size-matters";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").width;

export const fonts = {
  OpenSansBold: require("../assets/fonts/OpenSans-Bold.ttf"),
  OpenSansBoldItalic: require("../assets/fonts/OpenSans-BoldItalic.ttf"),
  OpenSansExtraBold: require("../assets/fonts/OpenSans-ExtraBold.ttf"),
  OpenSansExtraBoldItalic: require("../assets/fonts/OpenSans-ExtraBoldItalic.ttf"),
  OpenSansItalic: require("../assets/fonts/OpenSans-Italic.ttf"),
  OpenSansLight: require("../assets/fonts/OpenSans-Light.ttf"),
  OpenSansLightItalic: require("../assets/fonts/OpenSans-LightItalic.ttf"),
  OpenSansMedium: require("../assets/fonts/OpenSans-Medium.ttf"),
  OpenSansMediumItalic: require("../assets/fonts/OpenSans-MediumItalic.ttf"),
  OpenSansRegular: require("../assets/fonts/OpenSans-Regular.ttf"),
  OpenSansSemiBold: require("../assets/fonts/OpenSans-SemiBold.ttf"),
  OpenSansSemiBoldItalic: require("../assets/fonts/OpenSans-SemiBoldItalic.ttf"),
  OpenSansCondensedBold: require("../assets/fonts/OpenSans_Condensed-Bold.ttf"),
  OpenSansCondensedBoldItalic: require("../assets/fonts/OpenSans_Condensed-BoldItalic.ttf"),
  OpenSansCondensedExtraBold: require("../assets/fonts/OpenSans_Condensed-ExtraBold.ttf"),
  OpenSansCondensedExtraBoldItalic: require("../assets/fonts/OpenSans_Condensed-ExtraBoldItalic.ttf"),
  OpenSansCondensedItalic: require("../assets/fonts/OpenSans_Condensed-Italic.ttf"),
  OpenSansSemiCondensedLight: require("../assets/fonts/OpenSans_SemiCondensed-Light.ttf"),
  OpenSansSemiCondensedLightItalic: require("../assets/fonts/OpenSans_SemiCondensed-LightItalic.ttf"),
  OpenSansSemiCondensedSemiBoldItalic: require("../assets/fonts/OpenSans_SemiCondensed-SemiBoldItalic.ttf"),
};
type FontNames = keyof typeof fonts;
export {
  tw,
  screenWidth,
  screenHeight,
  screen,
  FontNames,
  scale,
  moderateScale,
  moderateVerticalScale,
  verticalScale,
};
