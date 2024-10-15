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
  screen,
  tw,
  verticalScale,
} from "@/constants/theme";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import showToast from "@/lib/utils/showToast";
import { clearCart, removeFromCart } from "@/redux/features/cartSlice";
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

const CartScreen = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { items } = useAppSelector((state) => state.cart);
  const renderItem: ListRenderItem<ICartItem> = useCallback(({ item }) => {
    return (
      <View
        style={tw`w-full overflow-hidden h-[${verticalScale(
          100
        )}px] mb-2 rounded-lg p-1 flex-row items-start gap-x-2 bg-white shadow border border-gray-100`}
      >
        {/* Product image */}
        <TouchableOpacity
          // onPress={() => onProductPress((item?.item as any)?._id as string)}
          style={tw` h-[80%] w-20 rounded bg-gray-50 overflow-hidden`}
        >
          {item?.thumbnail && (
            <Image
              source={{ uri: item?.thumbnail }}
              style={tw` h-full w-auto`}
              resizeMode="contain"
              // contentFit="contain"
              // placeholder={{ blurhash }}
            />
          )}
        </TouchableOpacity>
        {/* content view */}
        <View style={tw`  flex-1 pb-0.5 h-full  justify-between `}>
          <View style={tw` flex-1  flex-col gap-y-1`}>
            <ThemedText
              fontFamily="OpenSansSemiBold"
              // onPress={() => onProductPress((item?.item as any)?._id)}
              numberOfLines={2}
              ellipsizeMode="tail"
              // fontFamily="OpenSansLight"
              style={tw`w-full text-base   text-black tracking-wider `}
            >
              {item?.title}
            </ThemedText>

            <View style={tw`flex-col  gap-y-1 items-start `}>
              <ThemedText
                fontFamily="OpenSansLight"
                style={tw`  text-xs  text-gray-700`}
              >
                Unit Price: ${item?.price}
              </ThemedText>
            </View>
            <View style={tw`flex-row gap-x-2  items-center`}>
              <ThemedText
                fontFamily="OpenSansLight"
                style={tw`text-sm font-medium`}
              >
                Total:${item?.quantity * item?.price}
              </ThemedText>

              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="Remove"
                accessibilityHint=" Tap for remove from cart"
                style={tw` flex-row gap-x-1   h-12 w-auto items-center justify-center `}
                onPress={() => {
                  showToast({
                    type: "success",
                    message: "successfully deleted from cart.",
                  });
                }}
                // style={tw`flex-row px-1.5 py-[1px] border rounded-md border-gray-400 gap-x-1`}
              >
                <View
                  style={tw` bg-red-200/50 flex-row items-center justify-center gap-x-2 py-1 px-1 rounded`}
                >
                  <MaterialIcons
                    name="delete-outline"
                    size={14}
                    color="black"
                  />
                  <ThemedText style={tw`text-[12px] text-black`}>
                    Remove
                  </ThemedText>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={tw` flex-col items-center h-full  justify-between`}>
          <View style={tw` flex-col  gap-y-1`}>
            <Pressable
              accessibilityLabel="Minus Icon"
              accessibilityHint="Decrease from cart item"
              accessibilityRole="button"
              // onPress={() => {
              //   handleAddToCart({ sku: item.sku as any });
              // }}
              style={tw`  h-12 w-12 items-center justify-center `}
            >
              <Feather name="minus" size={20} color="black" />
            </Pressable>

            <TextInput
              editable={false}
              keyboardType="numeric"
              textAlign="center"
              style={tw` text-sm text-black font-medium text-center`}
              defaultValue={String(item?.quantity)}
              // value={String(productItemQuantity)}
            />
            <Pressable
              accessibilityLabel="Plus Icon"
              accessibilityHint="Increase from cart item"
              accessibilityRole="button"
              onPress={() => {}}
              style={tw`  h-12 w-12 items-center justify-center `}
            >
              <Feather name="plus" size={18} color="black" />
            </Pressable>
          </View>
        </View>
      </View>
    );
  }, []);
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
                style={tw` h-[${
                  screen.height * 0.7
                }px]  items-center justify-center   w-full`}
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
              size={18}
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
