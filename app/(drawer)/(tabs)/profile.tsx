import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Profile } from "@/components";
import { tw } from "@/constants/theme";
import { ThemedView } from "@/components/shared";

const ProfileScreen = () => {
  return (
    <ThemedView style={tw` flex-1 h-full w-full `}>
      <Profile />
    </ThemedView>
  );
};

export default ProfileScreen;
