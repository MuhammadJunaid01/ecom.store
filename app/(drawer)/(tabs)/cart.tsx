import { CartItem } from "@/components";
import { ThemedText, ThemedView } from "@/components/shared";
import CartInfo from "@/components/shared/CartInfo";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  tw,
} from "@/constants/theme";
import { ICartItem, IUser } from "@/lib/interfaces";
import { formatCurrency } from "@/lib/utils/utility";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  FlatList,
  ListRenderItem,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const CartScreen = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { items, totalPrice } = useAppSelector((state) => state.cart);
  const renderItem: ListRenderItem<ICartItem> = useCallback(({ item }) => {
    return (
      <CartItem
        {...item}
        onDecrease={(id) => dispatch(decreaseQuantity({ id }))}
        onIncrease={(id) => dispatch(increaseQuantity({ id }))}
        onRemove={(id) => dispatch(removeFromCart(id))}
      />
    );
  }, []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  // Set the snap points for the BottomSheet
  const snapPoints = useMemo(() => ["33%"], []);

  useEffect(() => {
    // Programmatically open the bottom sheet on mount
    if (bottomSheetRef.current) {
      bottomSheetRef.current.expand(); // Automatically expand on mount
    }
  }, []);
  return (
    <ThemedView
      accessible
      accessibilityHint="Cart"
      style={tw` flex-1 h-full w-full mb-20 bg-white  `}
    >
      <View style={tw`flex-1 w-full mt-2 `}>
        <FlatList
          contentContainerStyle={tw` px-4   pb-[${moderateVerticalScale(
            70
          )}px]`}
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
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={false}
          enableHandlePanningGesture={false}
          enableContentPanningGesture={false}
          handleIndicatorStyle={tw` hidden `}
        >
          <View style={tw` flex-1  shadow-md mt-1 bg-white`}>
            <CartInfo
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
              btnTitle="Proceed to check out"
              totalPrice={totalPrice}
            />
          </View>
        </BottomSheet>
      )}
    </ThemedView>
  );
};

export default CartScreen;
