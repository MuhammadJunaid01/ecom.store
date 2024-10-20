import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import React, { useMemo, useRef, useState } from "react";
import { scale, tw } from "@/constants/theme";
import ShippingAddress from "./ShippingAddress";
import DeliveryDetailsForm from "./DeliveryDetailsForm";
import SelectDeliveryAddress from "./SelectDeliveryAddress";
import { useAppSelector } from "@/redux/hooks";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { BottomModal, ThemedText } from "../shared";
import {
  AntDesign,
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { IEcomAddress } from "@/lib/interfaces";
import showToast from "@/lib/utils/showToast";
interface PaymentMethod {
  title: string;
  IconComponent: React.FC<{ size: number; color: string }>;
}
const DeliveryDetails = () => {
  const { user } = useAppSelector((state) => state.user);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const ref = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["33%"], []);
  const paymentMethods: PaymentMethod[] = useMemo(() => {
    return [
      {
        title: "Google Pay",
        IconComponent: ({ size, color }) => (
          <Ionicons name="logo-google" size={size} color={color} />
        ),
      },
      {
        title: "PayPal",
        IconComponent: ({ size, color }) => (
          <FontAwesome5 name="paypal" size={size} color={color} />
        ),
      },
      {
        title: "Credit Card",
        IconComponent: ({ size, color }) => (
          <MaterialCommunityIcons
            name="credit-card"
            size={size}
            color={color}
          />
        ),
      },
    ];
  }, []);
  const [selectedAddress, setSelectedAddress] = useState<IEcomAddress | null>(
    null
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentMethods[0]
  );
  return (
    <View style={tw` flex-1 relative`}>
      <ScrollView contentContainerStyle={tw` flex-grow `}>
        {user && user?.addresses.length > 0 ? (
          <View style={tw` flex-1`}>
            <SelectDeliveryAddress
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
          </View>
        ) : (
          <DeliveryDetailsForm />
        )}
      </ScrollView>
      <BottomSheet
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        enableHandlePanningGesture={false}
        enableContentPanningGesture={false}
        handleIndicatorStyle={tw` hidden  shadow bg-white `}
      >
        <View style={tw` flex-1  shadow-md mt-1 bg-white`}>
          <BottomSheetFlatList
            data={paymentMethods}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => setSelectedPaymentMethod(item)}
                style={tw` flex-row items-center   justify-between p-3 border-b border-gray-200`}
              >
                <View style={tw` flex-row items-center gap-x-3`}>
                  <item.IconComponent size={20} color="black" />
                  <ThemedText
                    fontFamily="OpenSansSemiBold"
                    style={tw` text-[${scale(13)}px]`}
                  >
                    {item.title}
                  </ThemedText>
                </View>
                <View style={tw` flex-row gap-x-2`}>
                  <View
                    style={tw` h-[${scale(16)}px] w-[${scale(
                      16
                    )}px] rounded-full items-center justify-center bg-black`}
                  >
                    <View
                      style={tw` h-[${scale(14)}px] w-[${scale(
                        14
                      )}px] rounded-full items-center justify-center bg-white`}
                    >
                      <View
                        style={tw` h-[${scale(12)}px] w-[${scale(
                          12
                        )}px] rounded-full items-center justify-center ${
                          selectedPaymentMethod.title == item?.title
                            ? "bg-gray-700"
                            : "bg-gray-400"
                        }`}
                      ></View>
                    </View>
                  </View>
                </View>
              </Pressable>
            )}
          />
          <View style={tw` flex-row items-center gap-x-3 justify-between pb-3`}>
            <TouchableOpacity
              onPress={() => bottomSheetRef.current?.present()}
              style={tw`  h-[${scale(
                30
              )}px]  flex-1 rounded-full items-center flex-row justify-center  gap-x-1    bg-gray-900 z-50`}
            >
              <Feather name="plus" size={scale(17)} style={tw` text-white`} />
              <ThemedText
                ellipsizeMode="tail"
                numberOfLines={1}
                fontFamily="OpenSansRegular"
                style={tw` text-[${scale(9)}px]  w-[80%] text-white`}
              >
                Add new shipping address
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (selectedAddress) {
                  router.push({
                    pathname: "/(tabs)/place-order",
                    params: {
                      shippingAddress: JSON.stringify(selectedAddress),
                      paymentMethod: selectedPaymentMethod.title,
                    },
                  });
                } else {
                  showToast({
                    type: "error",
                    message: "Select at least one shipping address.",
                  });
                }
              }}
              style={tw`  h-[${scale(
                30
              )}px] flex-row justify-between px-3 rounded-full items-center flex-1    bg-gray-900 z-50`}
            >
              <ThemedText
                fontFamily="OpenSansSemiBold"
                style={tw` text-[${scale(13)}px] text-white`}
              >
                Checkout
              </ThemedText>
              <AntDesign
                name="right"
                size={scale(13)}
                style={tw` text-white`}
              />
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
      {/* <FlatList
        data={paymentMethods}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <item.IconComponent size={40} color="black" />
            <Text style={{ marginLeft: 10 }}>{item.title}</Text>
          </View>
        )}
      /> */}
      <BottomModal
        defaultIndex={3}
        ref={bottomSheetRef}
        ModalBody={() => (
          <View style={tw` flex-1 `}>
            <BottomSheetScrollView contentContainerStyle={tw` px-3`}>
              <DeliveryDetailsForm />
            </BottomSheetScrollView>
          </View>
        )}
      />
      {/* <TouchableOpacity
        onPress={() => bottomSheetRef.current?.present()}
        style={tw` absolute  bottom-3 h-[${scale(30)}px] w-[${scale(
          30
        )}px] rounded-full items-center justify-center   left-3  bg-gray-900 z-50`}
      >
        <Feather name="plus" size={scale(17)} style={tw` text-white`} />
      </TouchableOpacity> */}
    </View>
  );
};

export default DeliveryDetails;
