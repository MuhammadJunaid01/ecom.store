import { tw } from "@/constants/theme";
import { IProduct } from "@/lib/interfaces";
import showToast from "@/lib/utils/showToast";
import { addToCart, addToWishList } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AntDesign, Entypo } from "@expo/vector-icons";
import React, { useCallback, useMemo } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Rating } from "react-native-ratings";
import { scale, verticalScale } from "react-native-size-matters";
import { ThemedText, ThemedView } from ".";
type CompName = "onSale" | "Category";
interface IProps {
  product: IProduct;
  width?: number;
  onPress?: (id: number) => void;
  height?: number;
  compName?: CompName;
}
const Product: React.FC<IProps> = ({
  product,
  width = 48,
  onPress,
  height = 170,
  compName = "onSale",
}) => {
  const dispatch = useAppDispatch();
  const { wishlist } = useAppSelector((state) => state.cart);
  const isExistFavorites = useCallback(
    (id: number) => {
      return wishlist.some((list) => list.id === id);
    },
    [wishlist, dispatch]
  );
  const cardWidth = useMemo(() => {
    switch (compName) {
      case "onSale":
        return Dimensions.get("screen").width * 0.4;

      case "Category":
        return Dimensions.get("screen").width * 0.6;

      default:
        return Dimensions.get("screen").width * 0.4;
    }
  }, [compName]);
  return (
    <Pressable
      onPress={() => onPress?.(product.id)}
      accessible
      accessibilityHint="Product"
      style={tw` w-[${cardWidth}px] h-[${verticalScale(
        height
      )}px]  relative rounded p-3
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
            style={tw` text-gray-400`}
          />
        )}
      </TouchableOpacity>
      <View style={tw` items-center justify-center flex-1`}>
        <View style={tw` absolute bottom-3  w-full`}>
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
              )}px] items-center justify-center flex-row rounded-full bg-gray-50 p-1 `}
            >
              <Entypo name="plus" size={scale(16)} style={tw` text-gray-500`} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default React.memo(Product);
