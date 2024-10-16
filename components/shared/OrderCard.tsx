import { moderateVerticalScale, scale, tw } from "@/constants/theme";
import { View, TouchableOpacity } from "react-native";
import ThemedText from "./ThemedText";
import { memo } from "react";

interface OrderCardProps {
  orderNumber: string;
  date: string;
  trackingNumber: string;
  quantity: number;
  totalAmount: string;
  status: "Delivered" | "Pending";
  item_height: number;
}

const OrderCard: React.FC<OrderCardProps> = memo(
  ({
    orderNumber,
    date,
    trackingNumber,
    quantity,
    totalAmount,
    status,
    item_height,
  }) => {
    return (
      <View
        style={tw` h-[${moderateVerticalScale(item_height)}px] p-[${scale(
          9
        )}px]  rounded-lg border border-gray-200`}
      >
        <View style={tw`flex-row justify-between`}>
          <ThemedText
            fontFamily="OpenSansBold"
            style={tw`text-[${scale(16)}px]  text-gray-800/70`}
          >
            Order № {orderNumber}
          </ThemedText>
          <ThemedText style={tw`text-gray-500`}>{date}</ThemedText>
        </View>

        <View style={tw` flex-row items-center justify-between`}>
          <ThemedText style={tw`text-gray-600 mt-2`}>
            Tracking number:
            <ThemedText style={tw`text-black text-sm `}>
              {trackingNumber}
            </ThemedText>
          </ThemedText>
          <ThemedText style={tw`text-gray-600`}>
            Quantity:
            <ThemedText style={tw`text-black font-semibold`}>
              {quantity}
            </ThemedText>
          </ThemedText>
        </View>

        <View style={tw`flex-row justify-between mt-2`}>
          <ThemedText style={tw`text-gray-600`}>
            Total Amount:
            <ThemedText style={tw`text-black font-semibold`}>
              {totalAmount}
            </ThemedText>
          </ThemedText>
          <ThemedText
            style={tw`${
              status === "Delivered" ? "text-green-600" : "text-yellow-500"
            } font-semibold`}
          >
            {status}
          </ThemedText>
        </View>
      </View>
    );
  }
);
export default OrderCard;
