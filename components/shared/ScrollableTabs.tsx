import { View, FlatList, ListRenderItem, TouchableOpacity } from "react-native";
import React, { memo, MutableRefObject, useCallback } from "react";
import { tw } from "@/constants/theme";
import { scale } from "react-native-size-matters";
import ThemedText from "./ThemedText";
import { Tab } from "@/lib/interfaces";

interface IProps {
  tabs: Tab[];
  selectedTab: Tab;
  tab_height?: number;
  onTabChange: (tab: Tab) => void;
  isFetching?: boolean;
  scrollToIndex?: () => void;
}
const ScrollableTabs = React.forwardRef<FlatList, IProps>(
  ({ tabs, selectedTab, tab_height = 33, onTabChange, isFetching }, ref) => {
    const renderItem: ListRenderItem<Tab> = useCallback(
      ({ item: tab, index }) => {
        return (
          <TouchableOpacity
            onPress={() => onTabChange(tab)}
            style={tw`   items-center justify-center h-[90%]  my-auto ${
              selectedTab.label === tab.label
                ? " bg-black"
                : " shadow bg-white  "
            }  rounded-full py-[${scale(4)}px] ${
              tab.label === "All"
                ? `px-[${scale(28)}px]`
                : `px-[${scale(15)}px]`
            }   ${index !== tabs.length - 1 ? `mr-[${scale(6)}px]` : ""}`}
            disabled={isFetching}
          >
            <ThemedText
              fontFamily="OpenSansMedium"
              style={tw` text-[${scale(14)}px] ${
                selectedTab.label === tab.label ? " text-white" : " text-black"
              }`}
            >
              {tab.label}
            </ThemedText>
          </TouchableOpacity>
        );
      },
      [selectedTab, isFetching]
    );
    return (
      <View style={tw`  h-[${scale(tab_height + 10)}px]  mt-[${scale(7)}px]`}>
        <FlatList
          ref={ref}
          horizontal
          data={tabs}
          renderItem={renderItem}
          keyExtractor={(_, index) => `KEY+${index}`}
          showsHorizontalScrollIndicator={false}
          // getItemLayout={(data, index) => ({
          //   length: 60,
          //   offset: 60 * index,
          //   index,
          // })}
          onScrollToIndexFailed={(info) => {
            const wait = new Promise((resolve) => setTimeout(resolve, 500)); // Adjust the delay as necessary
            wait.then(() => {
              (ref as MutableRefObject<FlatList>)?.current?.scrollToIndex({
                index: info.index,
                animated: true,
              });
            });
          }}
        />
      </View>
    );
  }
);

export default memo(ScrollableTabs);
