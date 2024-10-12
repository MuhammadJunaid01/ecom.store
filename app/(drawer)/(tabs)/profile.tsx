import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const profile = () => {
  return (
    <View>
      <Text>profile</Text>
      <TouchableOpacity onPress={() => router.push("/junaid")}>
        <Text>Hello Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default profile;
