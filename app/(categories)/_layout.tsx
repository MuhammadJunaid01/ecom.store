import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { searchCategories } from "@/redux/features/searchSlice";

const _layout = () => {
  const dispatch = useAppDispatch();
  const { categoryName } = useAppSelector((state) => state.search);
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="categories"
        options={{
          title: "Categories",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerShown: true,
          headerSearchBarOptions: {
            inputType: "text",
            placeholder: "Search.......",
            onChangeText: (text) =>
              dispatch(searchCategories(text.nativeEvent.text)),
          },

          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="[categoryId]"
        options={{
          title: categoryName,
          headerShadowVisible: false,
          headerShown: true,
          headerTitleAlign: "center",
          headerSearchBarOptions: {
            inputType: "text",
            autoCapitalize: "none",
            placeholder: "Search.......",
            // onChangeText: (text) =>
            //   dispatch(searchCategories(text.nativeEvent.text)),
          },

          animation: "slide_from_right",
        }}
      />
    </Stack>
  );
};

export default _layout;
