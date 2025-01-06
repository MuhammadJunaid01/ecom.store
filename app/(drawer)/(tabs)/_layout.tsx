import { ThemedText } from "@/components/shared";
import { scale, tw } from "@/constants/theme";
import { useAppSelector } from "@/redux/hooks";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import React, { useMemo } from "react";
import { Dimensions, Platform, StatusBar, Text, View } from "react-native";
import { BottomFabBar } from "rn-wave-bottom-bar";

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
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "white",
        tabBarActiveBackgroundColor: "green",
        tabBarInactiveBackgroundColor: "red",
        tabBarIcon: ({ focused }) => {
          switch (route?.name) {
            case "index":
              return focused ? (
                <MaterialIcons name="home" size={25} color="white" />
              ) : (
                <MaterialCommunityIcons
                  name="home-outline"
                  size={25}
                  color="white"
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
                  <Ionicons name="bag-handle" size={24} color="white" />
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
                  <Ionicons name="bag-handle-outline" size={24} color="white" />
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
                  <AntDesign name="heart" size={20} color="white" />
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
                  <Entypo name="heart-outlined" size={24} color="white" />
                </View>
              );

            case "products":
              return focused ? (
                <Entypo name="shopping-cart" size={24} color="white" />
              ) : (
                <Ionicons name="cart-outline" size={24} color="white" />
              );
            case "profile":
              return focused ? (
                <FontAwesome5 name="user-alt" size={24} color="white" />
              ) : (
                <FontAwesome5 name="user" size={24} color="white" />
              );
            case "place-order":
              return null;
            default:
              return null;
          }
        },
        tabBarStyle: {
          // alignItems: "flex-start",
          justifyContent: "space-between",

          height: 60,
          width: "100%",
          paddingBottom: Platform.OS === "ios" ? 0 : 5,
          backgroundColor: "white",
          // marginLeft: Dimensions.get("window").width / 2 - 160,
        },
        tabBarLabelStyle: {
          color: "black",
          // fontFamily: " ",
        },
        // tabBarActiveTintColor: "white",
        headerShown: false,
      })}
      tabBar={(props) => {
        const { state, descriptors, navigation } = props;

        // Define routes you want to hide
        const hiddenRoutes = ["place-order", "delivery-details"];

        // Filter routes to exclude hidden ones
        const filteredRoutes = state.routes.filter(
          (route) => !hiddenRoutes.includes(route.name)
        );

        // Update the state object to use filtered routes
        const modifiedState = {
          ...state,
          routes: filteredRoutes,
          index: Math.min(state.index, filteredRoutes.length - 1), // Adjust the index if needed
        };

        return (
          <BottomFabBar
            mode="default"
            isRtl={false}
            focusedButtonStyle={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 7 },
              shadowOpacity: 0.41,
              shadowRadius: 9.11,
              elevation: 14,
            }}
            bottomBarContainerStyle={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              width: "100%",
            }}
            state={modifiedState} // Pass modified state
            descriptors={descriptors} // Pass descriptors as is
            navigation={navigation} // Pass navigation as is
            insets={props.insets}
          />
        );
      }}
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
      {/* <Tabs.Screen
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
      /> */}
      {/* <Tabs.Screen
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
      /> */}
    </Tabs>
  );
};

export default TabsLayout;
