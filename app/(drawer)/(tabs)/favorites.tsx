import { View, Text } from "react-native";
import React from "react";
import { ThemedView } from "@/components/shared";
import { tw } from "@/constants/theme";

const FavoritesScreen = () => {
  return (
    <ThemedView style={tw` flex-1 h-full w-full bg-white`}>
      <Text>FavoritesScreen</Text>
    </ThemedView>
  );
};

export default FavoritesScreen;
