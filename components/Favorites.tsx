import {
  View,
  Text,
  ListRenderItem,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useCallback } from "react";
import { IProduct } from "@/lib/interfaces";
import { tw } from "@/constants/theme";
import { Entypo, Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";
import { scale } from "react-native-size-matters";
import { Filters, ThemedText } from "./shared";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart, addToWishList } from "@/redux/features/cartSlice";
import showToast from "@/lib/utils/showToast";
interface IProps {
  favorites: IProduct[];
}
const Favorites: React.FC<IProps> = ({ favorites }) => {
  const dispatch = useAppDispatch();
  const renderItem: ListRenderItem<IProduct> = useCallback(
    ({ item, index }) => {
      return (
        <View
          style={tw` flex-row items-start gap-x-2 justify-center h-[${scale(
            80
          )}px] shadow-md  bg-white  m-1 rounded-md`}
        >
          <View style={tw` h-full w-[30%] bg-gray-50`}>
            <Image
              source={{ uri: item?.thumbnail }}
              style={tw` h-full w-full`}
              resizeMode="contain"
            />
          </View>
          <View style={tw` flex-1 pt-2 h-full`}>
            <View style={tw` flex-row items-center justify-between`}>
              <ThemedText
                ellipsizeMode="tail"
                numberOfLines={1}
                fontFamily="OpenSansSemiBold"
                style={tw` text-[${scale(11)}px] w-[80%]`}
              >
                {item?.title}
              </ThemedText>
              <TouchableOpacity
                onPress={() => dispatch(addToWishList(item))}
                style={tw`  items-end flex-1 pr-3 `}
              >
                <Feather name="x" size={scale(13)} color="black" />
              </TouchableOpacity>
            </View>
            <ThemedText
              fontFamily="OpenSansSemiBold"
              style={tw` text-[${scale(9)}px] mt-1 text-gray-600`}
            >
              {item?.brand}
            </ThemedText>
            <View style={tw` flex-row  items-center gap-x-2 mt-1`}>
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
              onPress={() => {
                showToast({
                  type: "success",
                  message: `Great choice! ${item?.title} has been successfully added to your cart.`,
                });
                dispatch(addToCart(item));
              }}
              style={tw` absolute -bottom-3 right-2 h-[${scale(
                30
              )}px] w-[${scale(
                30
              )}px] items-center justify-center flex-row rounded-full  bg-gray-900`}
            >
              <FontAwesome6
                name="bag-shopping"
                size={scale(13)}
                style={tw` text-white ml-0.4`}
              />
              {/* <Entypo
                name="heart"
                size={scale(15)}
                style={tw` ${
                  index % 2 === 0 ? " text-yellow-400" : " text-gray-300"
                }`}
              /> */}
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
    [dispatch, favorites]
  );
  return (
    <View style={tw` flex-1 h-full w-full bg-transparent`}>
      <FlatList
        contentContainerStyle={tw` px-3 bg-gray-50  flex-grow`}
        data={favorites}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={tw` h-3 `} />}
      />
      {/* <Filters /> */}
    </View>
  );
};

export default Favorites;
