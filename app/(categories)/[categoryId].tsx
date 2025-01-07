import CategoryByProducts from "@/components/Categories/CategoryByProducts";
import { ScrollableTabs, ThemedText, ThemedView } from "@/components/shared";
import { scale, tw } from "@/constants/theme";
import { IProduct, Tab } from "@/lib/interfaces";
import { useGetAllCategoriesQuery } from "@/redux/apis/categoriesApiSlice";
import { setCategoryName } from "@/redux/features/searchSlice";
import { useAppDispatch } from "@/redux/hooks";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CategoryByProductsScreen = () => {
  const ref = useRef<FlatList>(null);
  const dispatch = useAppDispatch();

  const { categoryId, name } = useLocalSearchParams<{
    categoryId: string;
    name: string;
  }>();
  const [selectedTab, setSelectedTab] = useState<Tab | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const { data, isLoading: isCategoryLoading } = useGetAllCategoriesQuery("");
  const [scrollIndex, setScrollIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPriceHigh, setIsPriceHigh] = useState(false);
  const getProductsByCategory = useCallback(async () => {
    if (selectedTab?.query) {
      const res = await fetch(selectedTab?.query as string);
      const data = await res.json();
      return data;
    }
  }, [categoryId, selectedTab]);
  const tabs: Tab[] = useMemo(() => {
    if (!data) {
      return [];
    }
    if (categoryId) {
      const selected = data.find(
        (category) =>
          category?.name?.toLowerCase().trim() === name?.toLowerCase()?.trim()
      );
      const finIndex = data.findIndex(
        (category) =>
          category?.name?.toLowerCase()?.trim() === name?.toLowerCase()?.trim()
      );

      if (finIndex !== -1) {
        setScrollIndex(finIndex);
        // ref.current.scrollToIndex({ index: finIndex, animated: true });
      }
      if (selected) {
        setSelectedTab({ label: selected.name, query: selected.url });
      }
    }
    return data?.map((category) => {
      return {
        label: category.name,
        query: category.url,
      };
    });
  }, [data, ref]);
  useEffect(() => {
    if (selectedTab) {
      setIsLoading(true);
      // Create an async function inside the useEffect
      const fetchData = async () => {
        try {
          const data = await getProductsByCategory(); // Await the async function
          setProducts(data?.products);
        } catch (error) {
          console.error("Error fetching data:", error); // Handle errors
        } finally {
          setIsLoading(false);
        }
      };

      fetchData(); // Call the async function
    }
  }, [categoryId, getProductsByCategory, selectedTab]);
  useEffect(() => {
    if (scrollIndex) {
      if (ref.current) {
        ref.current.scrollToIndex({ index: scrollIndex, animated: true });
      }
    }
  }, [scrollIndex, categoryId]);

  return (
    <ThemedView style={tw` flex-1 h-full w-full bg-white `}>
      <View style={tw` px-3`}>
        <ScrollableTabs
          ref={ref}
          tabs={tabs}
          onTabChange={(tab) => {
            dispatch(setCategoryName(tab.label));
            setSelectedTab(tab);
          }}
          selectedTab={selectedTab as Tab}
        />
        <View
          style={tw` flex-row items-center justify-between  mt-3 pb-2 border-b border-gray-100`}
        >
          <View style={tw` `}>
            <TouchableOpacity style={tw` flex-row items-center gap-x-2`}>
              <Ionicons name="filter-outline" size={scale(14)} color="black" />
              <ThemedText style={tw` text-[${scale(11)}px]`}>Filter</ThemedText>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => setIsPriceHigh(!isPriceHigh)}
            style={tw` flex-row items-center `}
          >
            <AntDesign
              name={isPriceHigh ? "arrowdown" : "arrowup"}
              size={scale(11)}
              color="black"
            />
            <AntDesign
              name={isPriceHigh ? "arrowup" : "arrowdown"}
              size={scale(11)}
              color="black"
            />
            <ThemedText style={tw` text-[${scale(11)}px] ml-1`}>
              Price: Lowest to high
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
      <CategoryByProducts isFetching={isLoading} products={products} />
    </ThemedView>
  );
};

export default CategoryByProductsScreen;
