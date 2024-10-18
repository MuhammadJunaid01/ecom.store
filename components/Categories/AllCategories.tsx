import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from "react-native";
import React, { useCallback } from "react";
import { ICategory } from "@/lib/interfaces";
import { scale, tw } from "@/constants/theme";
import { ThemedText } from "../shared";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useAppDispatch } from "@/redux/hooks";
import { setCategoryName } from "@/redux/features/searchSlice";
interface IProps {
  categories: ICategory[] | undefined;
}
const AllCategories: React.FC<IProps> = ({ categories }) => {
  // console.log("categories", categories);
  const dispatch = useAppDispatch();
  const renderItem: ListRenderItem<ICategory> = useCallback(({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(setCategoryName(item.name));
          router.push({
            pathname: "/(categories)/[categoryId]" as any,
            params: { categoryId: item?.url, name: item?.name },
          });
        }}
        style={tw` h-[${scale(
          48
        )}px] flex-row justify-between items-center  border-b border-gray-100  `}
      >
        <ThemedText
          fontFamily="OpenSansSemiBold"
          style={tw` text-[${scale(10)}px] text-gray-900`}
        >
          {item?.name}
        </ThemedText>
        <AntDesign name="right" size={scale(14)} style={tw` text-gray-800`} />
      </TouchableOpacity>
    );
  }, []);
  return (
    <View style={tw` flex-1 h-full w-full bg-transparent px-3 `}>
      <ThemedText
        fontFamily="OpenSansSemiBold"
        style={tw` text-[${scale(14)}px] my-3 text-gray-700`}
      >
        Choose Category
      </ThemedText>
      <FlatList
        contentContainerStyle={tw` px-3`}
        showsVerticalScrollIndicator={false}
        data={categories}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default AllCategories;
