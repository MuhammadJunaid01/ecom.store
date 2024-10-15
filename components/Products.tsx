import { View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { IProduct } from "@/lib/interfaces";
import { ThemedText, ThemedView } from "./shared";
import { scale, tw, verticalScale } from "@/constants/theme";
import { Rating } from "react-native-ratings";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart, addToWishList } from "@/redux/features/cartSlice";
import showToast from "@/lib/utils/showToast";
interface IProps {
  products: IProduct[];
  isFetching: boolean;
  hasMore: boolean;
}

const Products: React.FC<IProps> = ({ products, isFetching, hasMore }) => {
  const dispatch = useAppDispatch();
  //   console.log(products);
  const ListFooter = React.useCallback(() => {
    if (isFetching && hasMore) {
      return (
        <View style={tw`flex items-start justify-center h-42`}>
          <View style={tw`text-left flex items-start justify-center`}>
            <ThemedText style={tw`text-2xl font-semibold text-gray-700 mb-2`}>
              Fetching...
            </ThemedText>
            <ThemedText style={tw`text-gray-500`}>
              Please wait while we fetch the data.
            </ThemedText>
          </View>
        </View>
      );
    }
    if (!isFetching && !hasMore) {
      return (
        <View style={tw`flex items-center justify-center h-10`}>
          <View style={tw`text-center flex items-center justify-center`}>
            <ThemedText style={tw`text-gray-500`}>End of the list</ThemedText>
          </View>
        </View>
      );
    }
    return null;
  }, [isFetching]);
  return (
    <ThemedView accessible accessibilityHint="Products" style={tw` flex-1 `}>
      <ThemedText
        accessibilityRole="header"
        accessible
        accessibilityLabel="Top Products"
        fontFamily="OpenSansMedium"
        style={tw` text-[${scale(16)}px] my-4`}
      >
        Top Products
      </ThemedText>
      <ThemedView
        style={tw` flex-row items-center justify-between gap-2 flex-wrap`}
      >
        {products?.map((product, i) => {
          return (
            <ThemedView
              accessible
              accessibilityHint="Product"
              key={i}
              style={tw` w-[48%] h-[${verticalScale(
                170
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
                    <Entypo
                      name="plus"
                      size={scale(16)}
                      style={tw` text-gray-800`}
                    />
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
                <AntDesign
                  name="hearto"
                  size={scale(17)}
                  style={tw` text-gray-500`}
                />
              </TouchableOpacity>
            </ThemedView>
          );
        })}
      </ThemedView>
      {ListFooter()}
    </ThemedView>
  );
};

export default Products;
