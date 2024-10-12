import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useCallback } from "react";
import { IProduct } from "@/lib/interfaces";
import { ThemedText, ThemedView } from "./shared";
import { tw } from "@/constants/theme";
interface IProps {
  products: IProduct[];
  isFetching: boolean;
  hasMore: boolean;
}
const Products: React.FC<IProps> = ({ products, isFetching, hasMore }) => {
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
              style={tw` w-[48%] h-[280px] rounded p-3
             shadow-md  bg-white `}
            >
              <Image
                style={tw` h-[60%]  w-full`}
                source={{ uri: product?.thumbnail }}
                resizeMode="contain"
              />
              <ThemedView style={tw` p-2`}>
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
                <ThemedText>{product.id}</ThemedText>
              </ThemedView>
            </ThemedView>
          );
        })}
      </ThemedView>
      {ListFooter()}
    </ThemedView>
  );
};

export default Products;
