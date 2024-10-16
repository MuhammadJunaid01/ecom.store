import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        options={{
          title: "My Orders",
          // gestureEnabled: false,
          headerShadowVisible: false,
          headerShown: true,
          headerSearchBarOptions: {
            inputType: "text",
            placeholder: "Search.......",
            onChangeText: (text) => console.log("", text.nativeEvent.text),
          },

          animation: "slide_from_right",
        }}
        name="my-orders"
      />
      <Stack.Screen
        options={{
          title: "Order Details",
          // gestureEnabled: false,
          headerShadowVisible: false,
          headerShown: true,
          // headerSearchBarOptions: {
          //   inputType: "text",
          //   placeholder: "Search.......",
          //   onChangeText: (text) => console.log("", text.nativeEvent.text),
          // },

          animation: "slide_from_right",
        }}
        name="[orderId]"
      />
    </Stack>
  );
};

export default _layout;
