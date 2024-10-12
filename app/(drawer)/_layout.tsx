import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerToggleButton,
} from "@react-navigation/drawer";
import { router, useNavigation, useSegments } from "expo-router";
import { tw } from "@/constants/theme";
import {
  AntDesign,
  EvilIcons,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useAppSelector } from "@/redux/hooks";
const _layout = () => {
  const navigation = useNavigation();
  const { items } = useAppSelector((state) => state.cart);
  const totalCartItems = useMemo(
    () => items?.reduce((acc, cur) => acc + cur.quantity, 0) || 0,
    [items]
  );
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="(tabs)"
      screenOptions={{
        headerLeft: () => (
          <View style={tw` pl-2.2`}>
            <TouchableOpacity
              style={tw` border border-gray-100 p-2 rounded-full`}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            >
              <Image
                source={{
                  uri: "https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/thumbnail.png",
                }}
                alt="Ecom Store Logo"
                style={tw` h-[30px] w-[30px] rounded-full  `}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
        ),
        headerRight: () => (
          <View style={tw` pr-3 flex-row items-center gap-x-2 justify-center`}>
            <TouchableOpacity onPress={() => console.log("HEllo")}>
              <EvilIcons
                name="search"
                size={33}
                style={tw` text-gray-500 mb-1`}
              />
            </TouchableOpacity>
            <View>
              <Ionicons name="bag-outline" size={28} color="black" />
              <View
                style={tw` h-[18px] w-[18px]  bg-gray-900 rounded-full flex-row items-center justify-center absolute top-[10px]  right-[-3px] z-50`}
              >
                <Text style={tw`text-[10px] text-white`}>
                  {totalCartItems || 0}
                </Text>
              </View>
            </View>
          </View>
        ),
        // headerTransparent: true,
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{ title: "Home", headerTitleStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="akbar"
        options={{ title: "Akbar", headerTitleStyle: { display: "none" } }}
      />
    </Drawer>
  );
};

export default _layout;
const CustomDrawerContent = (props: any) => {
  const { state, descriptors, navigation } = props;
  const segments = useSegments();
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={tw` flex-col items-center justify-center gap-y-3 border-b border-gray-300 pb-5`}
      >
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/women/26.jpg" }}
          width={80}
          height={80}
          style={tw` rounded-full items-center justify-center`}
        />
        <View style={tw` items-center justify-center`}>
          <Text style={tw` text-xl`}>John Doe</Text>
          <Text style={tw``}>john@email.com</Text>
        </View>
      </View>
      <View>
        {state.routes.map((route: any, index: any) => {
          const focused = index === state.index;
          const { drawerLabel } = descriptors[route.key].options;
          const label = (
            (drawerLabel !== undefined ? drawerLabel : route.name) as string
          ).replace(/[()]/g, ""); // Step 1: Remove parentheses
          // console.log("label", label);
          // Step 2: Capitalize first letter and concatenate the rest of the string
          const formattedLabel =
            label == "tabs"
              ? "Home"
              : label.charAt(0).toUpperCase() + label.slice(1);
          return (
            <DrawerItem
              key={route.key}
              label={({ color }) => <Text style={tw` `}>{formattedLabel}</Text>}
              focused={focused}
              onPress={() => {
                if (segments.join("/") === "(drawer)/(tabs)/profile") {
                  // navigation.replace("/");
                  navigation.navigate(route.name);
                } else {
                  navigation.navigate(route.name);
                }
              }}
            />
          );
        })}
      </View>
    </DrawerContentScrollView>
  );
};
const styles = StyleSheet.create({
  navItemLabel: {
    marginLeft: -20,
    fontSize: 18,
  },
  activeLabel: {
    fontWeight: "bold",
    color: "blue", // Active color
  },
  inactiveLabel: {
    color: "gray", // Inactive color
  },
  userInfoWrapper: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  userImg: {
    borderRadius: 40,
  },
  userDetailsWrapper: {
    marginTop: 25,
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 16,
    fontStyle: "italic",
    textDecorationLine: "underline",
  },
});
