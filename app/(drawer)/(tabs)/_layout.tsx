import { View, Text, Platform, StatusBar } from "react-native";
import React, { useMemo } from "react";
import { router, Tabs } from "expo-router";
import { scale, tw } from "@/constants/theme";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
  Entypo,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import { useAppSelector } from "@/redux/hooks";
import { ThemedText } from "@/components/shared";

const TabsLayout = () => {
  const { items, wishlist } = useAppSelector((state) => state.cart);
  const totalCartItems = useMemo(
    () => items?.reduce((acc, cur) => acc + cur.quantity, 0) || 0,
    [items]
  );
  const totalWishlistItems = useMemo(() => wishlist.length, [wishlist]);
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
            case "favorites":
              return focused ? (
                <View style={tw`relative`}>
                  {totalWishlistItems > 0 && (
                    <View
                      style={tw`px-1.5 py-[1px] bg-gray-900 rounded-full flex-row items-center justify-center absolute left-[23px] z-50`}
                    >
                      <ThemedText style={tw`text-[10px] text-white`}>
                        {totalWishlistItems}
                      </ThemedText>
                    </View>
                  )}
                  <AntDesign name="heart" size={20} color="#030712" />
                </View>
              ) : (
                <View style={tw`relative`}>
                  {totalWishlistItems > 0 && (
                    <View
                      style={tw`px-1.5 py-[1px] bg-gray-900 rounded-full flex-row items-center justify-center absolute -top-1 left-[23px] z-50`}
                    >
                      <ThemedText style={tw`text-[10px] text-white`}>
                        {totalWishlistItems}
                      </ThemedText>
                    </View>
                  )}
                  <Entypo name="heart-outlined" size={24} color="#030712" />
                </View>
              );

              return focused ? (
                <View style={tw`relative`}>
                  <Ionicons name="grid" size={24} color="#030712" />
                </View>
              ) : (
                <Ionicons name="grid-outline" size={24} color="#030712" />
              );
            case "products":
              return focused ? (
                <Entypo name="shopping-cart" size={24} color="black" />
              ) : (
                <Ionicons name="cart-outline" size={24} color="black" />
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
          // fontFamily: " ",
        },
        tabBarActiveTintColor: "#030712",
        headerShown: false,
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen
        name="products"
        options={{
          title: "Products",
          headerShown: true,
          // headerTitleAlign: "center",

          headerLeftContainerStyle: { paddingLeft: 10 },
          headerLeft: () => (
            <Feather
              onPress={() => {
                if (router.canGoBack()) {
                  router.back();
                }
              }}
              name="arrow-left"
              size={scale(20)}
              color="black"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          headerShown: true,
          headerLeftContainerStyle: { paddingLeft: 10 },
          headerLeft: () => (
            <Feather
              onPress={() => {
                if (router.canGoBack()) {
                  router.back();
                }
              }}
              name="arrow-left"
              size={scale(20)}
              color="black"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          headerShown: true,
          headerLeftContainerStyle: { paddingLeft: 10 },
          headerLeft: () => (
            <Feather
              onPress={() => {
                if (router.canGoBack()) {
                  router.back();
                }
              }}
              name="arrow-left"
              size={scale(20)}
              color="black"
            />
          ),
        }}
      />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      <Tabs.Screen
        name="delivery-details"
        options={{
          title: "Shipping Details",
          href: null,
          headerShown: true,
          headerLeftContainerStyle: { paddingLeft: 10 },
          headerLeft: () => (
            <Feather
              onPress={() => {
                router.push("/(tabs)/cart");
              }}
              name="arrow-left"
              size={scale(20)}
              color="black"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="place-order"
        options={{
          title: "Checkout",
          href: null,
          headerShown: true,
          headerLeftContainerStyle: { paddingLeft: 10 },
          headerLeft: () => (
            <Feather
              onPress={() => {
                router.push("/(tabs)/delivery-details");
              }}
              name="arrow-left"
              size={scale(20)}
              color="black"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
