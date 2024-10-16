import { View, Text } from "react-native";
import React from "react";
import { ThemedView } from "@/components/shared";
import { MyOrders } from "@/components/MyOrders";
import { tw } from "@/constants/theme";

const MyOrdersScreen = () => {
  return (
    <ThemedView style={tw` flex-1 h-full w-full bg-white`}>
      <MyOrders />
    </ThemedView>
  );
};

export default MyOrdersScreen;
