import {
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { tw } from "@/constants/theme";
import ThemedView from "@/components/shared/ThemedView";
import ThemedText from "@/components/shared/ThemedText";
import ThemedTextInput from "@/components/shared/ThemedTextInput";
import { BottomModal } from "@/components/shared";
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import Slider from "@/components/shared/Slider";
import { useGetAllCategoriesQuery } from "@/redux/apis/categoriesApiSlice";
import { Categories, Products } from "@/components";
import { ICategory, IProduct } from "@/lib/interfaces";
import { useLazyGetAllProductsQuery } from "@/redux/apis/productsApiSlice";
interface IQuery {
  selectedCategory: ICategory | null;
}
const initialQuery: IQuery = {
  selectedCategory: null,
};
const PAGE_LIMIT = 30;
const TabsHome = () => {
  const { data, isLoading } = useGetAllCategoriesQuery("");
  const [query, setQuery] = useState(initialQuery);
  const [getProducts, { isFetching }] = useLazyGetAllProductsQuery();
  const categoryRef = useRef<FlatList>(null);
  const [text, setText] = useState("");
  const bottomModalRef = useRef<BottomSheetModal>(null);
  const ref = useRef<TextInput>(null);
  const onPressSlider = () => bottomModalRef.current?.present();

  const sliders = useMemo(() => {
    return [
      {
        img: "https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/thumbnail.png",
        title: "Chanel Coco Noir Eau De",
        warranty: "1 week warranty",
      },
      {
        img: "https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/thumbnail.png",

        title: "Gucci Bloom Eau de",
        warranty: "2 week warranty",
      },
      {
        img: "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/thumbnail.png",
        title: "Annibale Colombo Bed",
        warranty: "3 week warranty",
      },
    ];
  }, []);
  const categories = useMemo(() => {
    if (!data) {
      return [];
    }
    return [{ name: "All" }, ...data];
  }, [data]);

  const [refreshing, setRefreshing] = useState(false);

  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async (resetPage = false) => {
    if (loading || !hasMore) return;

    setLoading(true);
    if (resetPage) {
      setRefreshing(true);
    }

    // Ensure page is at least 1 to avoid negative or zero skips
    const skip = page > 1 ? (page - 1) * PAGE_LIMIT : 0;
    // const category = query.selectedCategory?.slug
    //   ? `&tags=${query.selectedCategory?.slug}`
    //   : "";
    // console.log("category", category);
    const initialQuery = `limit=${PAGE_LIMIT}&skip=${skip}`;

    try {
      const response = await getProducts(initialQuery).unwrap();
      const totalProducts = response.total;
      const fetchedProducts = response.products;

      setProducts((prevProducts) => [...prevProducts, ...fetchedProducts]);

      // Check if all products are loaded
      if (products.length + fetchedProducts.length >= totalProducts) {
        setHasMore(false); // No more products to load
      }
      if (resetPage) setPage(1);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
      if (resetPage) {
        setRefreshing(false);
      }
    }
  };
  const onPressSelectCategory = useCallback(
    async (category: ICategory, index: number) => {
      try {
        setQuery((prev) => ({ ...prev, selectedCategory: category }));
        setProducts([]);
        const isCategoryAll = category.name !== "All";
        const initialQuery = `${isCategoryAll ? "limit=1000" : "limit=30"}`;
        const response = await getProducts(initialQuery).unwrap();
        const totalProducts = response.total;
        const fetchedProducts = response.products;
        const filteredData = isCategoryAll
          ? fetchedProducts.filter(
              (product) =>
                product.category.toLowerCase().trim() ==
                category.slug.toLowerCase().trim()
            )
          : fetchedProducts;
        setProducts((prevProducts) => [...prevProducts, ...filteredData]);
      } catch (error) {}
    },
    [query.selectedCategory]
  );
  const handleScroll = useCallback(
    ({ nativeEvent }: { nativeEvent: any }) => {
      const { contentOffset, contentSize, layoutMeasurement } = nativeEvent;
      const isCloseToBottom =
        layoutMeasurement.height + contentOffset.y >= contentSize.height - 100; // Load more when 100px from the bottom

      if (isCloseToBottom && !isFetching && hasMore) {
        setPage((prevPage) => prevPage + 1); // Load the next page
      }
    },
    [loading, hasMore]
  );

  const onRefresh = useCallback(() => {
    setPage(1); // Reset to the first page
    setProducts([]); // Clear the data
    setHasMore(true); // Reset hasMore
    fetchProducts(true); // Fetch data and reset page
    setQuery((prev) => ({
      ...prev,
      selectedCategory: categories[0] as ICategory,
    }));
  }, []);
  return (
    <ThemedView style={tw` bg-white flex-1  `}>
      <StatusBar barStyle={"light-content"} />

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <Slider sliders={sliders} />
        <View style={tw` px-3`}>
          <Categories
            selectedCategory={query.selectedCategory?.name as string}
            categories={categories as ICategory[]}
            isLoading={isLoading}
            onPressSelect={onPressSelectCategory}
          />
          <Products
            hasMore={hasMore}
            products={products}
            isFetching={isFetching}
          />
        </View>
      </ScrollView>
      {/* <FlatList
        data={products}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItem}
        nestedScrollEnabled
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={listHeader}
      /> */}
      <BottomModal
        ref={bottomModalRef}
        ModalBody={() => (
          <View>
            <ThemedText>Hello</ThemedText>
          </View>
        )}
      />
    </ThemedView>
  );
};

export default TabsHome;
