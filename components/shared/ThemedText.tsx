import { View, Text, TextProps } from "react-native";
import React from "react";
import { FontNames, moderateScale, tw } from "@/constants/theme";

interface IThemedText extends TextProps {
  fontFamily?: FontNames;
}
const ThemedText: React.FC<IThemedText> = (props) => {
  const { style, fontFamily = "OpenSansRegular", ...rest } = props;
  return (
    <Text
      style={[
        tw` text-[${moderateScale(16)}px]`,
        { fontFamily: fontFamily },
        style,
      ]}
      {...rest}
    />
  );
};

export default ThemedText;
