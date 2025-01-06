import { scale, tw, verticalScale } from "@/constants/theme";
import { IProduct } from "@/lib/interfaces";
import {
  useGetAllProductsQuery,
  useLazyGetAllProductsQuery,
} from "@/redux/apis/productsApiSlice";
import { useAppDispatch } from "@/redux/hooks";
import { router } from "expo-router";
import React, { useEffect, useMemo } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { ThemedText, ThemedView } from "./shared";
import Product from "./shared/Product";
type CompName = "onSale" | "Category";
interface IProps {
  query: string;
  title: string;
  compName?: CompName;
}

const Products: React.FC<IProps> = ({ query, title, compName = "onSale" }) => {
  const [getProducts, { data, isLoading }] = useLazyGetAllProductsQuery();
  //   console.log(products);
  useEffect(() => {
    getProducts(query);
  }, [query]);
  const compHeight = useMemo(() => {
    switch (compName) {
      case "onSale":
        return 180;

      case "Category":
        return 220;

      default:
        return 180;
    }
  }, [compName]);
  const ListFooter = React.useCallback(() => {
    if (isLoading) {
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
    if (!isLoading) {
      return (
        <View style={tw`flex items-center justify-center h-10`}>
          <View style={tw`text-center flex items-center justify-center`}>
            <ThemedText style={tw`text-gray-500`}>End of the list</ThemedText>
          </View>
        </View>
      );
    }
    return null;
  }, [isLoading]);

  return (
    <ThemedView accessible accessibilityHint="Products" style={tw` flex-1 `}>
      <ThemedView style={tw` flex-row items-center my-2 justify-between`}>
        <ThemedText
          accessibilityRole="header"
          accessible
          accessibilityLabel="Top Products"
          fontFamily="OpenSansMedium"
          style={tw` text-[${scale(16)}px] `}
        >
          {title}
        </ThemedText>
        <TouchableOpacity style={tw` h-11 w-16 items-center justify-center`}>
          <ThemedText
            accessibilityRole="header"
            accessible
            accessibilityLabel="Top Products"
            fontFamily="OpenSansMedium"
            style={tw` text-[${scale(13)}px] `}
          >
            See All
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={tw`h-[${verticalScale(compHeight)}px]   w-full`}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ThemedView style={tw`  flex-row  gap-x-3 items-center`}>
            {data?.products?.map((product, i) => {
              return (
                <Product
                  compName={compName}
                  height={compHeight - 10}
                  key={i}
                  product={product}
                  onPress={(id) =>
                    router.push({
                      pathname: "/products/[productId]" as any,
                      params: { productId: id },
                    })
                  }
                />
              );
            })}
            {ListFooter()}
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </ThemedView>
  );
};

export default React.memo(Products);
