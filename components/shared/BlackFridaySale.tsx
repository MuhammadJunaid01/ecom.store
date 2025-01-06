import { tw, verticalScale } from "@/constants/theme";
import React from "react";
import { Image, View } from "react-native";
const BlackFridaySale = () => {
  return (
    <View style={tw` h-[${verticalScale(100)}px] w-full`}>
      <Image
        source={require("../../assets/images/black-friday-sale.jpg")}
        style={tw` flex-1 h-full w-full rounded-lg`}
      />
    </View>
  );
};

export default React.memo(BlackFridaySale);
