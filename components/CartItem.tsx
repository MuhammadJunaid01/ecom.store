import { scale, tw } from "@/constants/theme";
import { Feather, Ionicons } from "@expo/vector-icons";
import { View, TouchableOpacity, Image } from "react-native";
import { ThemedText } from "./shared";
import { ICartItem } from "@/lib/interfaces";
import { formatCurrency } from "@/lib/utils/utility";

interface ProductCardProps extends ICartItem {
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}

const CartItem: React.FC<ProductCardProps> = ({
  thumbnail,
  price,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
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
          ellipsizeMode="tail"
          numberOfLines={1}
          fontFamily="OpenSansBold"
          style={tw`text-[${scale(11)}px]  text-gray-900/70  w-full`}
        >
          {title}
        </ThemedText>

        <ThemedText
          fontFamily="OpenSansRegular"
          style={tw`text-gray-500 text-[${scale(9)}px]`}
        >
          Unit Price:{formatCurrency(price)}
        </ThemedText>
        <ThemedText
          fontFamily="OpenSansRegular"
          style={tw`text-gray-500 mt-0.6 text-[${scale(9)}px]`}
        >
          Total:{formatCurrency(price * quantity)}
        </ThemedText>

        {/* Quantity Selector */}
        <View style={tw`flex-row items-center mt-[${scale(8)}px]`}>
          <TouchableOpacity
            onPress={() => onDecrease(id)}
            style={tw`p-1.5 border rounded-full border-gray-300`}
          >
            <Ionicons name="remove-outline" size={scale(13)} color="black" />
          </TouchableOpacity>
          <ThemedText style={tw`mx-4`}>{quantity}</ThemedText>
          <TouchableOpacity
            onPress={() => onIncrease(id)}
            style={tw`p-1.5 border rounded-full border-gray-300`}
          >
            <Ionicons name="add-outline" size={scale(13)} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Price */}
      <View style={tw` flex-col justify-between gap-y-2`}>
        <TouchableOpacity
          onPress={() => onRemove(id)}
          // onPress={() => dispatch(addToWishList(item))}
          style={tw`  items-end flex-1 pr-3 `}
        >
          <Feather name="x" size={scale(11)} color="black" />
        </TouchableOpacity>
        <ThemedText style={tw`text-lg font-semibold`}>{price}$</ThemedText>
      </View>
    </View>
  );
};
export default CartItem;
