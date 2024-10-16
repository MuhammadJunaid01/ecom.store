import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { memo } from "react";
import { IProduct } from "@/lib/interfaces";
import { moderateVerticalScale, scale, tw } from "@/constants/theme";
import { ThemedText } from "../shared";
import { formatCurrency } from "@/lib/utils/utility";
interface IProps {
  order: IProduct;
}
const OrderDetails: React.FC<IProps> = memo(({ order }) => {
  return (
    <View style={tw` flex-1 bg-white  px-1`}>
      <ScrollView style={tw`p-4 bg-white flex-grow`}>
        <View style={tw`mb-4`}>
          <ThemedText style={tw`text-[${scale(17)}px] font-bold`}>
            Order №1947034
          </ThemedText>
          <ThemedText style={tw`text-gray-500`}>
            Tracking number: IW3475453455
          </ThemedText>
          <ThemedText style={tw`text-green-500`}>Delivered</ThemedText>
        </View>

        <View style={tw`mb-4`}>
          <ThemedText style={tw`text-[${scale(17)}px] `}>
            {order?.minimumOrderQuantity || 5} items
          </ThemedText>
          {Array(order?.minimumOrderQuantity || 5)
            .fill(null)
            .map((_, index) => (
              <View
                key={index}
                style={tw`flex-row items-center h-[${moderateVerticalScale(
                  77
                )}px] mb-4 mx-1 shadow bg-white p-3 rounded`}
              >
                <View style={tw`w-16 h-full  mr-4`}>
                  {order?.thumbnail && (
                    <Image
                      source={{ uri: order?.thumbnail }}
                      style={tw` h-full w-full`}
                      alt="Order Item"
                      resizeMode="contain"
                    />
                  )}
                </View>
                <View style={tw` flex-1`}>
                  <ThemedText style={tw`text-base font-bold`}>
                    Pullover
                  </ThemedText>
                  <View style={tw` flex-row items-center justify-between`}>
                    <ThemedText style={tw`text-gray-500`}>Mango</ThemedText>
                    <ThemedText style={tw`text-gray-500`}>
                      Color: Gray Size: L
                    </ThemedText>
                  </View>
                  <View style={tw` flex-row items-center justify-between`}>
                    <ThemedText style={tw`text-gray-500`}>Units: 1</ThemedText>
                    <ThemedText style={tw`text-base font-bold`}>
                      {formatCurrency(51)}
                    </ThemedText>
                  </View>
                </View>
              </View>
            ))}
        </View>

        <View style={tw`mb-[${scale(12)}px]`}>
          <ThemedText style={tw`text-[${scale(17)}px] font-bold`}>
            Order information
          </ThemedText>
          <ThemedText style={tw`text-gray-500`}>Shipping Address:</ThemedText>
          <ThemedText style={tw`text-base`}>
            3 Newbridge Court, Chino Hills, CA 91709, United States
          </ThemedText>
          <ThemedText style={tw`text-gray-500`}>Payment method:</ThemedText>
          <ThemedText style={tw`text-base`}>Mastercard **** 3947</ThemedText>
          <ThemedText style={tw`text-gray-500`}>Delivery method:</ThemedText>
          <ThemedText style={tw`text-base`}>FedEx, 3 days, 15$</ThemedText>
          <ThemedText style={tw`text-gray-500`}>Discount:</ThemedText>
          <ThemedText style={tw`text-base`}>
            10%, Personal promo code
          </ThemedText>
          <ThemedText style={tw`text-gray-500`}>Total Amount:</ThemedText>
          <ThemedText style={tw`text-base font-bold`}>133$</ThemedText>
        </View>

        <View style={tw`flex-row gap-2 justify-between mb-14`}>
          <TouchableOpacity
            style={tw` h-[${scale(
              40
            )}px] items-center justify-center flex-1  border border-gray-200 rounded-full`}
          >
            <ThemedText
              fontFamily="OpenSansSemiBold"
              style={tw`text-gray-800  text-center`}
            >
              Reorder
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw` h-[${scale(
              40
            )}px] items-center justify-center flex-1 bg-red-500 rounded-full`}
          >
            <ThemedText
              fontFamily="OpenSansSemiBold"
              style={tw`text-white text-center`}
            >
              Leave feedback
            </ThemedText>
          </TouchableOpacity>
          {/* <TouchableOpacity style={tw`bg-red-500 py-2 px-4 rounded`}>
            <ThemedText style={tw`text-white text-center`}>
              Leave feedback
            </ThemedText>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </View>
  );
});

export default OrderDetails;
