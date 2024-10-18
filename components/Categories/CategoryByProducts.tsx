import {
  View,
  FlatList,
  ListRenderItem,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useCallback } from "react";
import { scale, tw } from "@/constants/theme";
import { IProduct } from "@/lib/interfaces";
import { ThemedText } from "../shared";
import { Entypo, EvilIcons, Ionicons } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";
interface IProps {
  products: IProduct[];
  isFetching: boolean;
}
const CategoryByProducts: React.FC<IProps> = ({ products, isFetching }) => {
  // console.log("products", products);
  const renderItem: ListRenderItem<IProduct> = useCallback(
    ({ item, index }) => {
      return (
        <View
          style={tw` flex-row items-start gap-x-2 justify-center h-[${scale(
            80
          )}px] shadow-md  bg-white  m-1 rounded`}
        >
          <View style={tw` h-full w-[30%] bg-gray-50`}>
            <Image
              source={{ uri: item?.thumbnail }}
              style={tw` h-full w-full`}
              resizeMode="contain"
            />
          </View>
          <View style={tw` flex-1 pt-2 h-full`}>
            <ThemedText
              fontFamily="OpenSansSemiBold"
              style={tw` text-[${scale(11)}px]`}
            >
              {item?.title}
            </ThemedText>
            <ThemedText
              fontFamily="OpenSansSemiBold"
              style={tw` text-[${scale(9)}px] mt-1 text-gray-600`}
            >
              {item?.brand}
            </ThemedText>
            <View style={tw` flex-row  items-center gap-x-2 mt-1`}>
              {/* {Array.from({ length: item.rating || 5 }).map((_, i) => {
              return (
                <View style={tw``} key={i}>
                  {i < 3 ? (
                    <Ionicons
                      name="star"
                      size={scale(14)}
                      style={tw` text-yellow-400`}
                    />
                  ) : (
                    // <EvilIcons
                    //   name="star"
                    //   size={scale(14)}
                    //   style={tw` text-yellow-400`}
                    // />
                    <Ionicons
                      name="star-half-sharp"
                      size={scale(14)}
                      style={tw` text-yellow-400`}
                    />
                  )}
                </View>
              );
            })} */}
              <Rating
                type="star"
                startingValue={item?.rating}
                imageSize={scale(9)}
                readonly
              />
              <View>
                <ThemedText style={tw` text-[${scale(9)}px] text-gray-500`}>
                  ({item?.rating})
                </ThemedText>
              </View>
            </View>
            <TouchableOpacity
              style={tw` absolute -bottom-3 right-2 h-[${scale(
                30
              )}px] w-[${scale(
                30
              )}px] items-center justify-center rounded-full  bg-white`}
            >
              <Entypo
                name="heart"
                size={scale(15)}
                style={tw` ${
                  index % 2 === 0 ? " text-yellow-400" : " text-gray-300"
                }`}
              />
              {/* <EvilIcons
                name="heart"
                size={scale(15)}
                style={tw` ${index % 2 === 0 ? " text-yellow-400" : ""}`}
              /> */}
            </TouchableOpacity>
          </View>
        </View>
      );
    },
    []
  );
  const ListFooter = React.useCallback(() => {
    if (isFetching) {
      return (
        <View style={tw`flex items-start justify-center  pb-11`}>
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
    } else {
      return null;
    }
  }, [isFetching]);
  return (
    <View style={tw` flex-1  mt-2 bg-gray-50/90`}>
      <FlatList
        contentContainerStyle={tw` px-3`}
        data={products}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={tw` h-3 `} />}
        ListFooterComponent={ListFooter}
      />
    </View>
  );
};

export default CategoryByProducts;
