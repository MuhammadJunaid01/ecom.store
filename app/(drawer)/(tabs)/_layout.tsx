import { View, Text, Platform } from "react-native";
import React, { useMemo } from "react";
import { Tabs } from "expo-router";
import { tw } from "@/constants/theme";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useAppSelector } from "@/redux/hooks";
import { ThemedText } from "@/components/shared";

const TabsLayout = () => {
  const { items } = useAppSelector((state) => state.cart);
  const totalCartItems = useMemo(
    () => items?.reduce((acc, cur) => acc + cur.quantity, 0) || 0,
    [items]
  );
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          switch (route?.name) {
            case "index":
              return focused ? (
                <MaterialIcons name="home" size={25} color="#030712" />
              ) : (
                <MaterialCommunityIcons
                  name="home-outline"
                  size={25}
                  color="black"
                />
              );
            case "cart":
              return focused ? (
                <View style={tw`relative`}>
                  {totalCartItems > 0 && (
                    <View
                      style={tw`px-1.5 py-[1px] bg-gray-900 rounded-full flex-row items-center justify-center absolute left-[23px] z-50`}
                    >
                      <ThemedText style={tw`text-[10px] text-white`}>
                        {totalCartItems}
                      </ThemedText>
                    </View>
                  )}
                  <Ionicons name="bag-handle" size={24} color="#030712" />
                </View>
              ) : (
                <View style={tw`relative`}>
                  {totalCartItems > 0 && (
                    <View
                      style={tw`px-1.5 py-[1px] bg-gray-900 rounded-full flex-row items-center justify-center absolute -top-1 left-[23px] z-50`}
                    >
                      <ThemedText style={tw`text-[10px] text-white`}>
                        {totalCartItems}
                      </ThemedText>
                    </View>
                  )}
                  <Ionicons
                    name="bag-handle-outline"
                    size={24}
                    color="#030712"
                  />
                </View>
              );

              return focused ? (
                <View style={tw`relative`}>
                  <Ionicons name="grid" size={24} color="#030712" />
                </View>
              ) : (
                <Ionicons name="grid-outline" size={24} color="#030712" />
              );
            case "orders":
              return focused ? (
                <MaterialCommunityIcons
                  name="clipboard-check"
                  size={24}
                  color="black"
                />
              ) : (
                <MaterialCommunityIcons
                  name="clipboard-check-outline"
                  size={24}
                  color="black"
                />
              );
            case "profile":
              return focused ? (
                <FontAwesome5 name="user-alt" size={24} color="#030712" />
              ) : (
                <FontAwesome5 name="user" size={24} color="#030712" />
              );
            default:
              return null;
          }
        },
        tabBarStyle: {
          alignItems: "flex-start",
          height: 50,
          paddingBottom: Platform.OS === "ios" ? 0 : 5,
        },
        tabBarLabelStyle: {
          color: "black",
          fontFamily: "helveticaNeueMedium",
        },
        tabBarActiveTintColor: "#030712",
        headerShown: false,
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
};

export default TabsLayout;
