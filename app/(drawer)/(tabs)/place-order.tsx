import { View, Text } from "react-native";
import React from "react";
import { ThemedView } from "@/components/shared";
import { tw } from "@/constants/theme";

const PlaceOrdersScreen = () => {
  return (
    <ThemedView style={tw` flex-1 h-full w-full  bg-white px-3 py-2`}>
      <Text>PlaceOrdersScreen</Text>
    </ThemedView>
  );
};

export default PlaceOrdersScreen;
