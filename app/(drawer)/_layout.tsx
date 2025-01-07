import { ThemedText } from "@/components/shared";
import { tw } from "@/constants/theme";
import { useAppSelector } from "@/redux/hooks";
import { MaterialIcons } from "@expo/vector-icons"; // Added MaterialIcons for the logout icon
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useNavigation, useSegments } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React, { useMemo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const _layout = () => {
  const segments = useSegments();
  const navigation = useNavigation();
  const { items } = useAppSelector((state) => state.cart);
  const totalCartItems = useMemo(
    () => items?.reduce((acc, cur) => acc + cur.quantity, 0) || 0,
    [items]
  );
  const isProfileScreen = useMemo(() => {
    return segments.join("/") === "(drawer)/(tabs)/profile";
  }, [segments]);

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="(tabs)"
      screenOptions={{
        // headerLeft: () =>
        //   isProfileScreen ? null : (
        //     <View style={tw` pl-2.2 h-14 items-center justify-center`}>
        //       <TouchableOpacity
        //         accessibilityRole="button"
        //         accessibilityHint="Tap for navigation screen"
        //         style={tw`  flex-row items-center h-12 gap-x-2`}
        //         onPress={() =>
        //           navigation.dispatch(DrawerActions.toggleDrawer())
        //         }
        //       >
        //         <Feather
        //           name="align-left"
        //           size={moderateScale(20)}
        //           style={tw` text-gray-700 mt-0.6`}
        //         />
        //         <ThemedText
        //           accessibilityHint="App Name"
        //           accessibilityLabel="Ecom Store"
        //           style={tw` text-[${moderateScale(16)}px]`}
        //           fontFamily="OpenSansSemiBold"
        //         >
        //           Ecom Store
        //         </ThemedText>
        //       </TouchableOpacity>
        //     </View>
        //   ),
        // headerRight: () =>
        //   isProfileScreen ? null : (
        //     <View
        //       accessibilityLabel="TopBar cart"
        //       accessible={true}
        //       style={tw` pr-3 h-14  flex-row items-center gap-x-2 justify-center`}
        //     >
        //       <TouchableOpacity
        //         accessibilityRole="button"
        //         accessibilityLabel="Search product"
        //         accessibilityHint="Tap for search products"
        //         style={tw` h-12 w-12 items-center justify-center`}
        //         onPress={() => console.log("HEllo")}
        //       >
        //         <EvilIcons
        //           name="search"
        //           size={moderateScale(28)}
        //           style={tw` text-gray-500 mb-1`}
        //         />
        //       </TouchableOpacity>
        //       <TouchableOpacity
        //         accessibilityRole="button"
        //         accessibilityLabel="navigate cart screen"
        //         accessibilityHint="Tap for navigate cart screen"
        //         style={tw` h-12 w-12 items-center justify-center`}
        //         onPress={() => router.push("/(drawer)/(tabs)/cart")}
        //       >
        //         <Ionicons
        //           name="bag-outline"
        //           size={moderateScale(22)}
        //           color="black"
        //         />
        //         <View
        //           style={tw` h-[18px] w-[18px]  bg-gray-900 rounded-full flex-row items-center justify-center absolute top-[10px]  right-[-3px] z-50`}
        //         >
        //           <Text style={tw`text-[10px] text-white`}>
        //             {totalCartItems || 0}
        //           </Text>
        //         </View>
        //       </TouchableOpacity>
        //     </View>
        //   ),
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{ title: "Home", headerTitleStyle: { display: "none" } }}
      />
      <Drawer.Screen name="akbar" options={{ title: "", headerShown: true }} />
    </Drawer>
  );
};

export default _layout;

const CustomDrawerContent = (props: any) => {
  const { state, descriptors, navigation } = props;
  const segments = useSegments();

  const handleLogout = () => {
    // Perform logout logic here, e.g., clear session, redirect to login
    // console.log("Logout Pressed");
    // router.replace("/auth/login"); // Replace with your login screen route
  };

  return (
    <DrawerContentScrollView
      contentContainerStyle={tw` h-full flex-1  relative`}
      style={tw` `}
      {...props}
    >
      <View
        style={tw`  relative flex-col items-center justify-center gap-y-3 border-b border-gray-300 pb-5`}
      >
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/women/26.jpg" }}
          width={80}
          height={80}
          style={tw` rounded-full items-center justify-center`}
        />
        <View style={tw` items-center justify-center`}>
          <ThemedText
            fontFamily="OpenSansSemiBold"
            style={tw` text-xl tracking-wider`}
          >
            John Doe
          </ThemedText>
          <ThemedText
            fontFamily="OpenSansRegular"
            style={tw` text-sm tracking-wider`}
          >
            john@email.com
          </ThemedText>
        </View>
      </View>

      <View style={tw`  `}>
        {state.routes.map((route: any, index: any) => {
          const focused = index === state.index;
          const { drawerLabel } = descriptors[route.key].options;
          const label = (
            (drawerLabel !== undefined ? drawerLabel : route.name) as string
          ).replace(/[()]/g, "");
          const formattedLabel =
            label == "tabs"
              ? "Home"
              : label?.charAt(0).toUpperCase() + label?.slice(1);
          return (
            <DrawerItem
              key={route.key}
              label={({ color }) => <Text style={tw` `}>{formattedLabel}</Text>}
              focused={focused}
              onPress={() => {
                if (segments.join("/") === "(drawer)/(tabs)/profile") {
                  navigation.navigate(route.name);
                } else {
                  navigation.navigate(route.name);
                }
              }}
            />
          );
        })}
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={tw`flex-row  w-full gap-x-3 items-center py-4 px-6 absolute  bottom-1`}
        onPress={handleLogout}
      >
        <Text style={tw`ml-4 text-base text-gray-700`}>Logout</Text>
        <MaterialIcons name="logout" size={24} color="black" />
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};
