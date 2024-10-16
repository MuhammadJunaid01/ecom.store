import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React, { useCallback } from "react";
import { ThemedText, ThemedView } from "@/components/shared";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  screen,
  tw,
  verticalScale,
} from "@/constants/theme";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import showToast from "@/lib/utils/showToast";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/redux/features/cartSlice";
import {
  Ionicons,
  FontAwesome6,
  Feather,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { ICartItem } from "@/lib/interfaces";
import { convertCamelCase } from "@/lib/utils/utility";
import { CartItem } from "@/components";

const CartScreen = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { items } = useAppSelector((state) => state.cart);
  const renderItem: ListRenderItem<ICartItem> = useCallback(({ item }) => {
    return (
      <CartItem
        {...item}
        onDecrease={(id) => dispatch(decreaseQuantity({ id }))}
        onIncrease={(id) => dispatch(increaseQuantity({ id }))}
      />
    );
  }, []);
  console.log("screen.height * 0.7", screen.height * 0.7);
  return (
    <ThemedView
      accessible
      accessibilityHint="Cart"
      style={tw` flex-1 h-full w-full bg-white p-3`}
    >
      <View style={tw`flex-1 w-full `}>
        <FlatList
          contentContainerStyle={tw` px-4`}
          keyExtractor={(_, i) => `KEY ${i}`}
          data={items}
          ListEmptyComponent={() => {
            return (
              <View
                style={tw` h-[${moderateVerticalScale(
                  450
                )}px]  items-center justify-center   w-full`}
              >
                <Ionicons
                  name="bag-handle-outline"
                  size={moderateScale(60)}
                  color="black"
                />
                <View style={tw` `}>
                  <ThemedText
                    fontFamily="OpenSansLight"
                    style={tw` text-[18px]  text-center mb-1`}
                  >
                    Your cart is empty.
                  </ThemedText>

                  <ThemedText
                    fontFamily="OpenSansLight"
                    style={tw` text-base my-0 `}
                  >
                    Looks like you haven't made your choice yet
                  </ThemedText>

                  <TouchableOpacity
                    // onPress={() => router.push("/(tabs)/categories/index")}
                    style={tw` items-center justify-center my-4 w-[150px] mx-auto  py-2 bg-gray-900  rounded `}
                  >
                    <ThemedText
                      fontFamily="OpenSansLight"
                      style={tw` text-sm my-0  text-white`}
                    >
                      Shop Now
                    </ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
          renderItem={renderItem}
          ItemSeparatorComponent={() => {
            return <View style={tw` h-2 w-full`} />;
          }}
        />
      </View>
      {items?.length > 0 && (
        <View style={tw`  w-full px-3 pb-2 flex-row items-center gap-x-3`}>
          <TouchableOpacity
            accessibilityHint="Tap for clear Cart"
            accessibilityLabel="Clear Cart"
            accessibilityRole="button"
            onPress={() => {
              dispatch(clearCart());
            }}
            style={tw`flex-1 bg-transparent rounded-md border border-red-400 py-[9px] flex-row items-center justify-center gap-x-2`}
          >
            <ThemedText
              fontFamily="OpenSansMedium"
              style={tw` text-[${moderateVerticalScale(
                14
              )}px] text-red-500 font-normal`}
            >
              {convertCamelCase("Clear Cart")}
            </ThemedText>
            <FontAwesome6 name="arrow-right" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (!user) {
                router.push({
                  pathname: "/(auth)/sign-in",
                  params: { redirectTo: "delivery-details" },
                });
              } else {
                router.push("/(drawer)/(tabs)/delivery-details" as any);
              }
            }}
            accessibilityRole="button"
            accessibilityHint="Tap for navigate proceed to buy screen"
            accessibilityLabel={convertCamelCase("PROCEED TO BUY")}
            style={tw`flex-1 bg-gray-900 rounded-md py-2.5 flex-row items-center justify-center gap-x-2`}
          >
            <ThemedText
              fontFamily="OpenSansMedium"
              style={tw` text-[${moderateVerticalScale(
                14
              )}px]  text-white font-normal`}
            >
              {convertCamelCase("PROCEED TO BUY")}
            </ThemedText>
            <AntDesign
              name="right"
              size={scale(18)}
              style={tw` mt-0.5`}
              color="white"
            />
          </TouchableOpacity>
        </View>
      )}
    </ThemedView>
  );
};

export default CartScreen;
