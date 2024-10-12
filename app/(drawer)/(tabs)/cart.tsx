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
import { tw } from "@/constants/theme";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import showToast from "@/lib/utils/showToast";
import { clearCart, removeFromCart } from "@/redux/features/cartSlice";
import {
  Ionicons,
  FontAwesome6,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { ICartItem } from "@/lib/interfaces";

const CartScreen = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  const renderItem: ListRenderItem<ICartItem> = useCallback(({ item }) => {
    return (
      <View
        style={tw`w-full h-[110px] mb-2 rounded-lg p-1 flex-row items-start gap-x-2 bg-white shadow border border-gray-100`}
      >
        {/* Product image */}
        <TouchableOpacity
          // onPress={() => onProductPress((item?.item as any)?._id as string)}
          style={tw` h-auto w-20 rounded bg-gray-50 overflow-hidden`}
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
        <View
          style={tw` flex-1 pb-0.5 h-full flex-col items-start justify-between `}
        >
          <Text
            // onPress={() => onProductPress((item?.item as any)?._id)}
            numberOfLines={2}
            ellipsizeMode="tail"
            // fontFamily="OpenSansLight"
            style={tw`w-full text-base font-semibold text-black tracking-wider `}
          >
            {item?.title}
          </Text>

          <View style={tw`flex-col gap-y-1  items-start `}>
            <ThemedText
              fontFamily="OpenSansLight"
              style={tw`  text-xs  text-gray-700 `}
            >
              Size:
              {/* {typeof item?.sku === "object" && item?.sku?.metaData?.weight} */}
            </ThemedText>
            <ThemedText
              fontFamily="OpenSansLight"
              style={tw`  text-xs  text-gray-700`}
            >
              Unit Price: ${item?.price}
              {/* {typeof item?.sku === "object" &&
            formatCurrency(item?.sku?.pricing?.currentPrice || 0)} */}
            </ThemedText>
          </View>

          <View style={tw`flex-row gap-x-2  items-center`}>
            <ThemedText
              fontFamily="OpenSansLight"
              style={tw`text-sm font-medium`}
            >
              Total:${item?.quantity * item?.price}
              {/* {formatCurrency(
            (typeof item?.sku === "object" &&
              item?.sku?.pricing?.currentPrice * itemQuantity) ||
              0
          )} */}
            </ThemedText>

            <TouchableOpacity
              onPress={() => {
                // dispatch(
                //   removeFromCart({
                //     sku: (item?.sku as EComSKU)._id as string,
                //     quantity: item?.quantity || 0,
                //   })
                // );
                showToast({
                  type: "success",
                  message: "successfully deleted from cart.",
                });
              }}
              style={tw`flex-row px-1.5 py-[1px] border rounded-md border-gray-400 gap-x-1`}
            >
              <MaterialIcons name="delete-outline" size={14} color="black" />
              <ThemedText style={tw`text-[12px] text-black`}>Remove</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={tw` flex-col items-center h-full  justify-between`}>
          <Pressable
            // onPress={() => {
            //   handleAddToCart({ sku: item.sku as any });
            // }}
            style={tw` p-1`}
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
            onPress={() => {
              // dispatch(
              //   // increaseQuantity({
              //   //   itemId: (item.item as IEComItem)?._id as string,
              //   //   skuId: (item.sku as EComSKU)?._id,
              //   // })
              // );
            }}
            style={tw` p-1 `}
          >
            <Feather name="plus" size={18} color="black" />
          </Pressable>
        </View>
      </View>
    );
  }, []);
  return (
    <ThemedView style={tw` flex-1 h-full w-full bg-white p-3`}>
      <View style={tw`flex-1 w-full `}>
        <FlatList
          contentContainerStyle={tw` px-4`}
          keyExtractor={(_, i) => `KEY ${i}`}
          data={items}
          ListEmptyComponent={() => {
            return (
              <View
                style={tw` h-[${
                  screen.height - 100
                }px]  items-center justify-center   w-full`}
              >
                <Ionicons name="bag-handle-outline" size={60} color="black" />
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
            onPress={() => {
              dispatch(clearCart());
            }}
            style={tw`flex-1 bg-transparent rounded-md border border-red-400 py-[9px] flex-row items-center justify-center gap-x-2`}
          >
            <ThemedText
              fontFamily="OpenSansMedium"
              style={tw` text-sm  text-red-500 font-normal`}
            >
              Clear Cart
            </ThemedText>
            <FontAwesome6 name="arrow-right" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => {
            //   if (!user?._id) {
            //     showToast({
            //       type: "error",
            //       message: " login before proceed to buy",
            //     });
            //     router.push({
            //       pathname: "/(auth)/signIn",
            //       params: { redirectTo: "/delivery-details" },
            //     });
            //   } else if (cartData && cartData?.length < 1) {
            //     router.replace("/");
            //   } else {
            //     router.replace("/delivery-details");
            //   }
            // }}
            style={tw`flex-1 bg-gray-900 rounded-md py-2.5 flex-row items-center justify-center gap-x-2`}
          >
            <ThemedText
              fontFamily="OpenSansMedium"
              style={tw` text-sm  text-white font-normal`}
            >
              PROCEED TO BUY
            </ThemedText>
            <FontAwesome6 name="arrow-right" size={20} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </ThemedView>
  );
};

export default CartScreen;
