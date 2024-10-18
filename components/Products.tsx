import { View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { IProduct } from "@/lib/interfaces";
import { ThemedText, ThemedView } from "./shared";
import { scale, tw, verticalScale } from "@/constants/theme";
import { Rating } from "react-native-ratings";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart, addToWishList } from "@/redux/features/cartSlice";
import showToast from "@/lib/utils/showToast";
import Product from "./shared/Product";
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
          return <Product key={i} product={product} />;
        })}
      </ThemedView>
      {ListFooter()}
    </ThemedView>
  );
};

export default Products;
