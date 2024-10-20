import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { tw } from "@/constants/theme";
import { formatCurrency } from "@/lib/utils/utility";
import { router } from "expo-router";
import { scale } from "react-native-size-matters";
import ThemedText from "./ThemedText";
import { IUser } from "@/lib/interfaces";
interface IProps {
  totalPrice: number;
  isCheckOut?: boolean;
  paymentMethod?: string;
  btnTitle: string;
  onPress: () => void;
}
const CartInfo: React.FC<IProps> = ({
  totalPrice,
  isCheckOut = false,
  paymentMethod,
  btnTitle,
  onPress,
}) => {
  return (
    <View style={[tw`bg-white flex-1   shadow-lg  p-4 rounded-lg  `]}>
      {!isCheckOut && (
        <View>
          <ThemedText style={tw`text-gray-500 mb-1 text-[${scale(11)}px]`}>
            Enter Discount Code
          </ThemedText>
          <View
            style={tw`flex-row mb-4 border border-gray-300 rounded-md items-center justify-center`}
          >
            <TextInput
              style={tw`flex-1  rounded-md p-2`}
              placeholder="Enter code"
            />
            <TouchableOpacity style={tw` ml-2 px-4 py-2 rounded-md`}>
              <ThemedText
                fontFamily="OpenSansBold"
                style={tw`text-gray-500 text-[${scale(11)}px]`}
              >
                Apply
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={tw`mb-1 flex-row justify-between`}>
        <ThemedText style={tw`text-gray-700  text-[${scale(11)}px]`}>
          Subtotal
        </ThemedText>
        <ThemedText style={tw`text-black font-bold text-[${scale(11)}px]`}>
          {formatCurrency(totalPrice)}
        </ThemedText>
      </View>
      <View style={tw`mb-1 flex-row items-center justify-between`}>
        <ThemedText style={tw`text-gray-700 text-[${scale(11)}px]`}>
          Total
        </ThemedText>
        <ThemedText style={tw`text-black font-bold text-[${scale(11)}px]`}>
          {formatCurrency(totalPrice)}
        </ThemedText>
      </View>
      {paymentMethod && (
        <View style={tw`mb-1 flex-row items-center justify-between`}>
          <ThemedText style={tw`text-gray-700 text-[${scale(11)}px]`}>
            paymentMethod
          </ThemedText>
          <ThemedText style={tw`text-black font-bold text-[${scale(11)}px]`}>
            {paymentMethod}
          </ThemedText>
        </View>
      )}
      <View style={tw` items-center flex-1 justify-center`}>
        <TouchableOpacity
          onPress={() => onPress()}
          style={tw`bg-gray-900 items-center  mx-auto  flex-row  justify-center absolute bottom-0 w-full px-8 py-4 rounded-lg`}
        >
          <ThemedText style={tw`text-white font-bold`}>{btnTitle}</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartInfo;
