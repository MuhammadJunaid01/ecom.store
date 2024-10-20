import { View, Text } from "react-native";
import React, { useEffect, useMemo, useRef } from "react";
import { ThemedText, ThemedView } from "@/components/shared";
import { moderateVerticalScale, scale, tw } from "@/constants/theme";
import { useLocalSearchParams } from "expo-router";
import { IEcomAddress, IUser } from "@/lib/interfaces";
import { generateFullAddress } from "@/lib/utils/utility";
import CartInfo from "@/components/shared/CartInfo";
import BottomSheet from "@gorhom/bottom-sheet";
import { useAppSelector } from "@/redux/hooks";

const PlaceOrdersScreen = () => {
  const { totalPrice } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.user);
  const { shippingAddress, paymentMethod } = useLocalSearchParams();
  console.log("shippingAddress", JSON.parse(shippingAddress as string));
  const shippingAddressParse = useMemo(() => {
    const add = JSON.parse(shippingAddress as string);
    return add as IEcomAddress;
  }, []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  // Set the snap points for the BottomSheet
  const snapPoints = useMemo(() => ["27%"], []);

  useEffect(() => {
    // Programmatically open the bottom sheet on mount
    if (bottomSheetRef.current) {
      bottomSheetRef.current.expand(); // Automatically expand on mount
    }
  }, []);
  return (
    <ThemedView style={tw` flex-1 h-full w-full  bg-white px-3 `}>
      <ThemedText
        fontFamily="OpenSansSemiBold"
        style={tw` text-[${scale(11)}px] tracking-wider`}
      >
        Shipping Address
      </ThemedText>
      <View
        style={tw` h-[${moderateVerticalScale(
          60
        )}px] overflow-hidden  mb-2 mt-0.6 bg-white shadow-md rounded-md p-2`}
      >
        <ThemedText
          fontFamily="OpenSansSemiBold"
          style={tw` text-[${scale(13)}px]`}
        >
          {shippingAddressParse?.addressType}
        </ThemedText>
        <ThemedText
          ellipsizeMode="tail"
          numberOfLines={2}
          fontFamily="OpenSansSemiBold"
          style={tw` text-[${scale(10)}px] text-gray-600 mt-0.4`}
        >
          {generateFullAddress(shippingAddressParse)}
        </ThemedText>
      </View>
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
            onPress={() => console.log("HHH")}
            paymentMethod={paymentMethod as string}
            isCheckOut
            btnTitle="Submit"
            totalPrice={totalPrice}
          />
        </View>
      </BottomSheet>
    </ThemedView>
  );
};

export default PlaceOrdersScreen;
