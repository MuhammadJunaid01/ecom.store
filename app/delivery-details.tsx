import { View } from "react-native";
import React from "react";
import { tw } from "@/constants/theme";
import { DeliveryDetails } from "@/components/DeliveryDetails";

const DeliveryDetailsScreen = () => {
  return (
    <View style={tw` flex-1 h-full w-full bg-white px-3 `}>
      <DeliveryDetails />
    </View>
  );
};

export default DeliveryDetailsScreen;
