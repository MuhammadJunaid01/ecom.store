import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useRef } from "react";
import { ICategory } from "@/lib/interfaces";
import { BottomModal, ThemedText, ThemedView } from "./shared";
import { moderateScale, tw } from "@/constants/theme";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router } from "expo-router";

interface IProps {
  categories: ICategory[];
  isLoading: boolean;
  selectedCategory: string;
  onPressSelect: (val: ICategory, index: number) => void;
}

const Categories = React.forwardRef<FlatList, IProps>(
  ({ categories, selectedCategory, onPressSelect }, ref) => {
    const modalRef = useRef<BottomSheetModal>(null);

    const renderItem: ListRenderItem<ICategory> = useCallback(
      ({ item, index }) => (
        <TouchableOpacity
          onPress={() => onPressSelect(item, index)}
          style={tw`w-auto h-[${moderateScale(
            48
          )}px]  justify-center px-9 rounded-full shadow-md my-0.5 ${
            selectedCategory === undefined && item.name === "All"
              ? "bg-black"
              : selectedCategory === item.name
              ? "bg-black"
              : "bg-white"
          }`}
        >
          <ThemedText
            fontFamily="OpenSansMedium"
            style={tw` text-[${moderateScale(16)}px] ${
              selectedCategory === undefined && item.name === "All"
                ? "text-white"
                : selectedCategory === item.name
                ? "text-white"
                : ""
            }`}
          >
            {item.name}
          </ThemedText>
        </TouchableOpacity>
      ),
      [selectedCategory, onPressSelect]
    );
    const getItemLayout = (_: any, index: number) => ({
      length: 100, // Fixed height/width of each item
      offset: 100 * index, // item height/width * index
      index,
    });
    return (
      <ThemedView style={tw``}>
        <ThemedView style={tw`flex-row h-12  items-center justify-between`}>
          <ThemedText>Categories</ThemedText>
          <TouchableOpacity
            style={tw` h-full w-auto items-center justify-center`}
            onPress={() => router.push("/(categories)/categories" as any)}
          >
            <ThemedText>See all</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <FlatList
          getItemLayout={getItemLayout}
          ref={ref}
          showsHorizontalScrollIndicator={false}
          data={categories}
          horizontal
          nestedScrollEnabled
          ItemSeparatorComponent={() => <View style={tw`w-3`} />}
          keyExtractor={(_, i) => i.toString()}
          renderItem={renderItem}
        />

        <BottomModal
          defaultIndex={2}
          ref={modalRef}
          ModalBody={() => (
            <ThemedView style={tw`px-3`}>
              <ThemedText>Hello</ThemedText>
            </ThemedView>
          )}
        />
      </ThemedView>
    );
  }
);

export default Categories;
