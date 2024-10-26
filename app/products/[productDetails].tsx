import { ThemedText } from "@/components/shared";
import DropDown from "@/components/shared/DropDown";
import Ratings from "@/components/shared/Ratings";
import { blurhash, moderateVerticalScale } from "@/constants/theme";
import { Review } from "@/lib/interfaces";
import { useLazyGetProductByProductIdQuery } from "@/redux/apis/productsApiSlice";
import { Entypo, EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Animated,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";

import tw from "twrnc";

const HEADER_MAX_HEIGHT = moderateVerticalScale(390);
const HEADER_MIN_HEIGHT = moderateVerticalScale(70);
const SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const ScrollViewScreen = () => {
  const [getProduct, { data, isLoading }] = useLazyGetProductByProductIdQuery();
  const [dropDown, setDropDown] = useState({
    description: true,
    review_ratings: false,
  });
  const { productDetails } = useLocalSearchParams();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [selectedImageId, setSelectedImageId] = useState(0);
  const animatedHeaderHeight = scrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const animatedHeaderColor = scrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: ["red", "#e5e7eb"],
    extrapolate: "clamp",
  });
  const animatedImgStyle = scrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, 0],
    extrapolate: "clamp",
  });

  const animatedImagesStyle = scrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [40, 0],
    extrapolate: "clamp",
  });

  // New opacity style for images
  const animatedImageOpacity = scrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE * 0.7],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  useEffect(() => {
    if (productDetails) {
      getProduct({ productId: productDetails as string });
    }
  }, [productDetails]);
  const sleetedImage = useMemo(() => {
    if (!data) {
      return null;
    }
    if (data?.images?.length > 0) {
      return data.images[selectedImageId];
    }
    return data.thumbnail;
  }, [data, selectedImageId]);
  if (isLoading) {
    <View style={tw` flex-1 items-center justify-center`}>
      <ActivityIndicator color={"black"} size={"large"} />
    </View>;
  }

  return (
    <View style={tw`flex-1`}>
      <Animated.View
        style={[
          tw`absolute left-0 right-0 w-full items-center justify-center`,
          {
            height: animatedHeaderHeight,
            backgroundColor: animatedHeaderColor,
            zIndex: 10,
          },
        ]}
      >
        <View style={tw` flex-1 h-full w-full bg-white`}>
          <Animated.View style={[tw``, { height: animatedImgStyle }]}>
            {sleetedImage && (
              <Image
                source={{ uri: sleetedImage }}
                style={tw` h-full w-full`}
                // placeholder={{ blurhash }}
                resizeMode="contain"
              />
            )}
          </Animated.View>
          <View
            style={tw` absolute top-[${
              StatusBar.currentHeight || 25
            }px] left-0 right-0 w-full z-50   flex-row h-11 items-center justify-between px-5`}
          >
            <TouchableOpacity
              style={tw` h-full px-3 z-50 items-center  justify-center `}
              onPress={() => {
                if (router.canGoBack()) {
                  router.back();
                }
              }}
            >
              <EvilIcons name="close" size={24} style={tw`  text-green-600`} />
            </TouchableOpacity>
            <View style={tw` flex-row items-center gap-x-2`}>
              <TouchableOpacity
                style={tw` h-full px-3 z-50 items-center justify-center  `}
              >
                <EvilIcons name="heart" size={30} style={tw`text-gray-400`} />
              </TouchableOpacity>
              <TouchableOpacity
                style={tw` h-full px-3 z-50 items-center justify-center  `}
              >
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={21}
                  style={tw` mt-1 text-green-600`}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Animated.View
            style={[
              tw`absolute bottom-0 w-full       right-0 left-0 `,
              { height: animatedImagesStyle, opacity: animatedImageOpacity },
            ]}
          >
            <View
              style={[
                tw` flex-row items-center  px-2 flex-wrap justify-between`,
                { backgroundColor: "rgba(0, 0, 0, 0.4)" },
              ]}
            >
              <View
                style={[
                  tw` items-center flex-1 p-1 justify-center gap-x-3 flex-row`,
                ]}
              >
                {data?.images.map((image, i) => (
                  <TouchableOpacity
                    onPress={() => setSelectedImageId(i)}
                    key={i}
                    style={tw`items-center  rounded-md bg-white mr-2 p-1 border ${
                      selectedImageId === i
                        ? " border-green-300"
                        : " border-white"
                    }  justify-center overflow-hidden h-full w-10`}
                  >
                    <Image
                      source={{ uri: image }}
                      style={tw`h-full w-full`}
                      // placeholder={{ blurhash }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <View>
                <ThemedText style={tw` text-white`}>
                  {selectedImageId + 1}/{data?.images?.length}
                </ThemedText>
              </View>
            </View>
          </Animated.View>
        </View>
      </Animated.View>
      <ScrollView
        contentContainerStyle={tw`pt-[${HEADER_MAX_HEIGHT}px]  flex-grow`}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {/* Details */}
        <View style={tw` px-4 flex-1 h-full w-full  pt-5  bg-white`}>
          <View style={tw` flex-row items-center justify-between w-full`}>
            <ThemedText fontFamily="OpenSansMedium">{data?.title}</ThemedText>
            <View
              style={tw` flex-row items-center gap-x-1 rounded bg-red-400 p-1`}
            >
              <ThemedText fontFamily="OpenSansMedium" style={tw` text-white`}>
                Sale -
              </ThemedText>
              <ThemedText fontFamily="OpenSansMedium" style={tw` text-white`}>
                {data?.discountPercentage}%
              </ThemedText>
            </View>
          </View>
          <View style={tw` flex-row items-center gap-x-2  mt-3`}>
            <ThemedText
              fontFamily="OpenSansRegular"
              style={tw`  text-gray-600`}
            >
              availability :
            </ThemedText>
            {data?.stock && data?.stock > 0 ? (
              <ThemedText
                fontFamily="OpenSansRegular"
                style={tw` text-green-500`}
              >
                In stock
              </ThemedText>
            ) : null}
          </View>
          <DropDown
            title="Description"
            isExpanded={dropDown.description}
            onToggle={() => {
              setDropDown((prev) => ({
                ...prev,
                description: !dropDown.description,
              }));
            }}
            body={
              <View style={tw` flex-1  gap-y-1  h-full    w-full `}>
                <View style={tw` flex-row items-start  w-full  gap-x-0`}>
                  <Entypo name="dot-single" size={24} color="black" />
                  <ThemedText
                  // ellipsizeMode="tail"
                  // numberOfLines={1}
                  // style={tw` w-[95%]`}
                  >
                    {data?.description}
                  </ThemedText>
                </View>
                <View style={tw` flex-row items-center  w-full  gap-x-0`}>
                  <Entypo name="dot-single" size={24} color="black" />
                  <ThemedText
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={tw` w-[95%]`}
                  >
                    height: {data?.dimensions?.height}
                  </ThemedText>
                </View>
                <View style={tw` flex-row items-center  w-full  gap-x-0`}>
                  <Entypo name="dot-single" size={24} color="black" />
                  <ThemedText
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={tw` w-[95%]`}
                  >
                    width: {data?.dimensions?.width}
                  </ThemedText>
                </View>
              </View>
            }
          />
          <DropDown
            title="Review & Ratings"
            isExpanded={dropDown.review_ratings}
            expandedViewHeight={480}
            onToggle={() => {
              setDropDown((prev) => ({
                ...prev,
                review_ratings: !dropDown.review_ratings,
              }));
            }}
            body={
              <View
                style={tw` flex-1  gap-y-3  h-full    w-full overflow-hidden`}
              >
                <Ratings reviews={data?.reviews as Review[]} />
              </View>
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ScrollViewScreen;
