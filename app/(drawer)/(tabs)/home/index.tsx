import { Categories, Products } from "@/components";
import Posts from "@/components/Posts";
import { BottomModal } from "@/components/shared";
import BlackFridaySale from "@/components/shared/BlackFridaySale";
import Slider from "@/components/shared/Slider";
import ThemedText from "@/components/shared/ThemedText";
import ThemedView from "@/components/shared/ThemedView";
import { tw } from "@/constants/theme";
import { ICategory, IProduct } from "@/lib/interfaces";
import showToast from "@/lib/utils/showToast";
import { useGetAllCategoriesQuery } from "@/redux/apis/categoriesApiSlice";
import {
  useGetAllProductsQuery,
  useLazyGetAllProductsQuery,
} from "@/redux/apis/productsApiSlice";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FlatList, ScrollView, StatusBar, TextInput, View } from "react-native";
interface IQuery {
  selectedCategory: ICategory | null;
}
const initialQuery: IQuery = {
  selectedCategory: null,
};
const PAGE_LIMIT = 30;
const TabsHome = () => {
  const { data: products, isLoading: isProductsLoading } =
    useGetAllProductsQuery(`limit=5`);
  const { data, isLoading } = useGetAllCategoriesQuery("");
  const [query, setQuery] = useState(initialQuery);
  const [getProducts, { isFetching, data: productsData }] =
    useLazyGetAllProductsQuery();
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

  const onRefresh = useCallback(async () => {
    try {
      getProducts("limit=8");
    } catch (err: any) {}
  }, []);
  return (
    <ThemedView style={tw` bg-white flex-1  `}>
      <StatusBar barStyle={"light-content"} />

      <ScrollView contentContainerStyle={tw` pb-20`}>
        <Slider sliders={sliders} />
        <View style={tw` px-3 flex-1`}>
          <Products query="limit=10" title="On Sale Today" compName="onSale" />
          <View style={tw` mt-7`}>
            <Products
              query="limit=30"
              title="Beauty"
              compName="Category"
              category="beauty"
            />
          </View>
          <View style={tw` mt-7`}>
            <Products
              query="limit=30"
              title="Furniture"
              compName="Category"
              category="furniture"
            />
          </View>
          <View style={tw` mt-5`}>
            <BlackFridaySale />
          </View>
          <View style={tw` mt-5`}>
            <Posts />
          </View>
        </View>
      </ScrollView>

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
