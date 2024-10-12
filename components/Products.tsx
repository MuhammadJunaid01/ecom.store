import { View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { IProduct } from "@/lib/interfaces";
import { ThemedText, ThemedView } from "./shared";
import { tw } from "@/constants/theme";
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
    <ThemedView style={tw` flex-1 `}>
      <ThemedText fontFamily="OpenSansRegular">Top Products</ThemedText>
      <ThemedView
        style={tw` flex-row items-center justify-between gap-2 flex-wrap`}
      >
        {products?.map((product, i) => {
          return (
            <ThemedView
              key={i}
              style={tw` w-[48%] h-[220px]  relative rounded p-3
             shadow-md  bg-white `}
            >
              <Image
                style={tw` h-[45%]  w-full`}
                source={{ uri: product?.thumbnail }}
                resizeMode="contain"
              />
              <ThemedView style={tw` p-2 w-full`}>
                <ThemedText
                  fontFamily="OpenSansMedium"
                  style={tw` text-xl text-gray-600`}
                >
                  {product?.title.slice(0, 11)}
                </ThemedText>
                <ThemedText
                  fontFamily="OpenSansCondensedBold"
                  style={tw` text-xl  mt-0.5 text-gray-600`}
                >
                  ${product?.price}
                </ThemedText>
                <View style={tw` flex-row items-center justify-between mt-1`}>
                  <Rating
                    type="star"
                    startingValue={product.rating} // Set the initial rating value
                    imageSize={12} // Customize the size of the stars
                    readonly // Marks the rating as disabled (non-interactive)
                  />
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(addToCart(product));
                      showToast({
                        type: "success",
                        message: `Great choice! ${product?.title} has been successfully added to your cart.`,
                      });
                    }}
                    style={tw` h-[30px] w-[30px] items-center justify-center flex-row rounded-full bg-gray-100 p-1 `}
                  >
                    <Entypo name="plus" size={18} style={tw` text-gray-800`} />
                  </TouchableOpacity>
                </View>
              </ThemedView>
              <TouchableOpacity
                onPress={() => {
                  dispatch(addToWishList(product));
                  showToast({
                    type: "success",
                    message: `Great choice! ${product?.title} has been successfully added to your wishlist.`,
                  });
                }}
                style={tw` absolute top-3 right-4 z-50`}
              >
                <AntDesign name="hearto" size={18} style={tw` text-gray-800`} />
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
