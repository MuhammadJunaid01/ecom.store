import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useGetAllCategoriesQuery } from "@/redux/apis/categoriesApiSlice";
import { Categories, OrderCard } from "@/components";
import { ScrollableTabs, ThemedText, ThemedView } from "@/components/shared";
import { tw } from "@/constants/theme";
import { IProduct, Tab } from "@/lib/interfaces";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useLazyGetAllProductsQuery } from "@/redux/apis/productsApiSlice";
import Product from "@/components/shared/Product";
const PAGE_LIMIT = 30;
const item_height = 100;
const ProductsScreen = () => {
  const [getProducts, { data, isFetching, isLoading }] =
    useLazyGetAllProductsQuery();
  const { data: categoriesData } = useGetAllCategoriesQuery("");
  const categories = useMemo(() => {
    if (!categoriesData) {
      return [];
    }
    return categoriesData.map((category) => {
      return {
        label: category.name,
        query: category.url,
      };
    });
  }, [data]);
  const [selectedTab, setSelectedTab] = useState<Tab>(categories[0]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch products when the component mounts or when page changes
  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    const skip = (page - 1) * PAGE_LIMIT;
    const query = `limit=${PAGE_LIMIT}&skip=${skip}`;

    try {
      const response = await getProducts(query).unwrap();
      const totalProducts = response.total;
      const fetchedProducts = response.products;

      // Append new products to the existing list
      setProducts((prevProducts) => [...prevProducts, ...fetchedProducts]);

      // Check if more products are available
      if (
        fetchedProducts.length < PAGE_LIMIT ||
        products.length + fetchedProducts.length >= totalProducts
      ) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setPage(1); // Reset page
    setProducts([]); // Clear products
    setHasMore(true); // Reset to allow further fetching
  }, []);
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
  const ListEmpty = React.memo(() => {
    if (isFetching) return null;
    return (
      <View style={tw`flex items-center justify-center h-96`}>
        <View style={tw`text-center flex items-center justify-center`}>
          <MaterialCommunityIcons
            name="package-variant-closed"
            size={64}
            color="#9ca3af"
            style={tw`mb-4`}
          />
          <ThemedText style={tw`text-2xl font-semibold text-gray-700 mb-2`}>
            {"No Data Available"}
          </ThemedText>
          <ThemedText style={tw`text-gray-500`}>
            {"There are no items to display at this time."}
          </ThemedText>
        </View>
      </View>
    );
  });
  const renderItem: ListRenderItem<IProduct> = useCallback(
    ({ item, index }) => {
      return (
        <View
          style={tw` flex-1 w-full`}
          //   onPress={() =>
          //     router.push({
          //       pathname: "/(orders)/[orderId]" as any,
          //       params: { orderId: item?.id },
          //     })
          //   }
        >
          <Product width={94} product={item} />
        </View>
      );
    },
    []
  );

  return (
    <ThemedView style={tw` flex-1 h-full w-full bg-white`}>
      <View style={tw` px-3 mb-2`}>
        <ScrollableTabs
          tabs={categories}
          onTabChange={(tab: Tab) => {
            setSelectedTab(tab);
            onRefresh(); // Reset on tab change
          }}
          selectedTab={selectedTab}
        />
      </View>
      <FlatList
        key={"two-column"}
        numColumns={2}
        contentContainerStyle={tw` pb-11 mt-3 px-4`}
        data={products}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItem}
        onRefresh={onRefresh}
        refreshing={isLoading}
        onEndReached={() => {
          if (!loading && hasMore) setPage((prev) => prev + 1); // Increment page if more products are available
        }}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={21}
        columnWrapperStyle={tw` justify-between`}
        ListFooterComponent={ListFooter}
        ListEmptyComponent={ListEmpty}
        getItemLayout={(_data, index) => ({
          length: item_height,
          offset: item_height * index,
          index,
        })}
        ItemSeparatorComponent={() => <View style={tw` h-3 `} />}
      />
    </ThemedView>
  );
};

export default ProductsScreen;
