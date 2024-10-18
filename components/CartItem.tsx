import { scale, tw } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { View, TouchableOpacity, Image } from "react-native";
import { ThemedText } from "./shared";
import { ICartItem } from "@/lib/interfaces";
import { formatCurrency } from "@/lib/utils/utility";

interface ProductCardProps extends ICartItem {
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
}

const CartItem: React.FC<ProductCardProps> = ({
  thumbnail,
  price,
  quantity,
  onIncrease,
  onDecrease,
  title,
  id,
}) => {
  return (
    <View style={tw`flex-row items-center bg-white rounded-lg shadow p-4 mb-4`}>
      {/* Product Image */}
      <Image source={{ uri: thumbnail }} style={tw`w-16 h-16 rounded`} />

      {/* Product Details */}
      <View style={tw`flex-1 px-4`}>
        <ThemedText
          fontFamily="OpenSansBold"
          style={tw`text-[${scale(11)}px]  text-gray-900/70`}
        >
          {title}
        </ThemedText>
        <ThemedText
          fontFamily="OpenSansRegular"
          style={tw`text-gray-500 text-[${scale(9)}px]`}
        >
          Unit Price:{formatCurrency(price)}
        </ThemedText>

        {/* Quantity Selector */}
        <View style={tw`flex-row items-center mt-[${scale(8)}px]`}>
          <TouchableOpacity
            onPress={() => onDecrease(id)}
            style={tw`p-2 border rounded-full border-gray-300`}
          >
            <Ionicons name="remove-outline" size={scale(20)} color="black" />
          </TouchableOpacity>
          <ThemedText style={tw`mx-4`}>{quantity}</ThemedText>
          <TouchableOpacity
            onPress={() => onIncrease(id)}
            style={tw`p-2 border rounded-full border-gray-300`}
          >
            <Ionicons name="add-outline" size={scale(20)} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Price */}
      <ThemedText style={tw`text-lg font-semibold`}>{price}$</ThemedText>
    </View>
  );
};
export default CartItem;
