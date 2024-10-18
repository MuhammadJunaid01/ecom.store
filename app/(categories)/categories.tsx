import { View, Text } from "react-native";
import React, { useMemo } from "react";
import AllCategories from "@/components/Categories/AllCategories";
import { ThemedView } from "@/components/shared";
import { tw } from "@/constants/theme";
import { useGetAllCategoriesQuery } from "@/redux/apis/categoriesApiSlice";
import { useAppSelector } from "@/redux/hooks";

const CategoriesScreen = () => {
  const { data, isLoading } = useGetAllCategoriesQuery("");
  const { categorySearchTerm } = useAppSelector((state) => state.search);
  const filteredCategories = useMemo(() => {
    if (!data) {
      return [];
    }
    if (!categorySearchTerm) {
      return data;
    } else {
      return data.filter(
        (category) => category.slug.includes(categorySearchTerm)
        // ||
        //   category.name.includes(categorySearchTerm) ||
        //   category.url.includes(categorySearchTerm)
      );
    }
  }, [categorySearchTerm, data]);
  return (
    <ThemedView style={tw` flex-1 h-full w-full bg-white`}>
      <AllCategories categories={filteredCategories} />
    </ThemedView>
  );
};

export default CategoriesScreen;
