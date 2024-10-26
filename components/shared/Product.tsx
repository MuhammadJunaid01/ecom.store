import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import React, { useCallback, useMemo } from "react";
import { ThemedText, ThemedView } from ".";
import { tw } from "@/constants/theme";
import showToast from "@/lib/utils/showToast";
import { addToCart, addToWishList } from "@/redux/features/cartSlice";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";
import { verticalScale, scale } from "react-native-size-matters";
import { IProduct } from "@/lib/interfaces";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
interface IProps {
  product: IProduct;
  width?: number;
  onPress?: (id: number) => void;
}
const Product: React.FC<IProps> = ({ product, width = 48, onPress }) => {
  const dispatch = useAppDispatch();
  const { wishlist } = useAppSelector((state) => state.cart);
  const isExistFavorites = useCallback(
    (id: number) => {
      return wishlist.some((list) => list.id === id);
    },
    [wishlist, dispatch]
  );

  return (
    <Pressable
      onPress={() => onPress?.(product.id)}
      accessible
      accessibilityHint="Product"
      style={tw` w-[${width}%] h-[${verticalScale(170)}px]  relative rounded p-3
             shadow-md  bg-white `}
    >
      <Image
        accessibilityHint="Product Image"
        accessible
        alt={product?.thumbnail}
        accessibilityRole="image"
        style={tw` h-[45%]  w-full`}
        source={{ uri: product?.thumbnail }}
        resizeMode="contain"
      />
      <ThemedView style={tw` p-2 w-full`}>
        <ThemedText
          fontFamily="OpenSansMedium"
          style={tw` text-[${scale(14)}px]  text-gray-600`}
        >
          {product?.title.slice(0, 11)}
        </ThemedText>
        <View style={tw` flex-row gap-x-1.5 items-center mt-0.5`}>
          <ThemedText
            fontFamily="OpenSansBold"
            style={tw` text-[${scale(14)}px]  text-gray-600`}
          >
            ${product?.price}
          </ThemedText>
          <View>
            <ThemedText
              fontFamily="OpenSansRegular"
              style={tw` text-sm   text-gray-600`}
            >
              ${product?.price}
            </ThemedText>
            <View
              style={tw` h-[1px] w-[40px] bg-black absolute bottom-[9px]`}
            />
          </View>
        </View>
        <View style={tw` flex-row items-center justify-between mt-1`}>
          <Rating
            type="star"
            startingValue={product.rating} // Set the initial rating value
            imageSize={scale(9)} // Customize the size of the stars
            readonly // Marks the rating as disabled (non-interactive)
          />
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Plus Icon"
            accessibilityHint="Tap for add to cart"
            onPress={() => {
              dispatch(addToCart(product));
              showToast({
                type: "success",
                message: `Great choice! ${product?.title} has been successfully added to your cart.`,
              });
            }}
            style={tw` h-[${scale(30)}px] w-[${scale(
              30
            )}px] items-center justify-center flex-row rounded-full bg-gray-100 p-1 `}
          >
            <Entypo name="plus" size={scale(16)} style={tw` text-gray-800`} />
          </TouchableOpacity>
        </View>
      </ThemedView>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Heart Icon"
        accessibilityHint="Tap for add to wishlist"
        onPress={() => {
          dispatch(addToWishList(product));
          showToast({
            type: "success",
            message: `Great choice! ${product?.title} has been successfully added to your wishlist.`,
          });
        }}
        style={tw` h-12 w-12  absolute top-3 right-1 z-50`}
      >
        {isExistFavorites(product.id) ? (
          <Entypo name="heart" size={scale(17)} style={tw` text-yellow-400`} />
        ) : (
          <AntDesign
            name="hearto"
            size={scale(17)}
            style={tw` text-gray-500`}
          />
        )}
      </TouchableOpacity>
    </Pressable>
  );
};

export default Product;
