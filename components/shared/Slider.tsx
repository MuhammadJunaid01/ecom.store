import { View, TouchableOpacity, Image, ImageBackground } from "react-native";
import React, { memo, useEffect, useRef, useState } from "react";
import {
  moderateScale,
  scale,
  screen,
  tw,
  verticalScale,
} from "@/constants/theme";
import ThemedView from "./ThemedView";
import PagerView from "react-native-pager-view";
import ThemedText from "./ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";

interface ISliderProps {
  sliders: ISlider[];
}
type ISlider = {
  img: string;
  title: string;
  warranty: string;
};

const Slider: React.FC<ISliderProps> = ({ sliders }) => {
  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const sliderHeight = screen.height * 0.24; // Define height based on screen
  const navigation = useNavigation();
  const onPageSelected = (event: any) => {
    // console.log(`Page selected: ${event.nativeEvent.position}`); // Debug log
    setCurrentPage(event.nativeEvent.position);
  };

  const scrollToPage = (index: number) => {
    if (pagerRef.current) {
      pagerRef.current.setPage(index);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prevPage) => {
        const nextPage = (prevPage + 1) % sliders.length; // Loop back to the first page
        scrollToPage(nextPage);
        return nextPage;
      });
    }, 9000); // Change this value to adjust the scroll duration

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [sliders.length]);

  return (
    <View
      style={tw`mt-0 h-[${moderateScale(240)}px] w-full   bg-gray-900  px-4`}
    >
      <PagerView
        ref={pagerRef}
        onPageSelected={onPageSelected}
        initialPage={0}
        style={tw`flex-1`}
      >
        {sliders.map((slide, i) => (
          <ThemedView
            key={i}
            style={tw`flex-1  bg-transparent flex-row w-full h-full  items-center justify-center    `}
          >
            <View style={tw` w-[40%]`}>
              <ThemedText
                // ellipsizeMode="tail"
                // numberOfLines={1}
                fontFamily="OpenSansBold"
                style={tw` font-medium my-2 text-[${scale(
                  16
                )}px] w-full leading-10   text-white`}
              >
                {slide.title.slice(0, 10)}
              </ThemedText>
              <ThemedText
                fontFamily="OpenSansLight"
                style={tw` text-white  my-1 font-medium text-[${scale(
                  12
                )}px] tracking-wider`}
              >
                {slide.warranty}
              </ThemedText>
              <TouchableOpacity
                style={tw`  bg-green-400 mt-2 items-center justify-center w-[70%] py-1.7 rounded-full `}
              >
                <ThemedText
                  fontFamily="OpenSansBold"
                  style={tw`  text-gray-900`}
                >
                  Buy Now
                </ThemedText>
              </TouchableOpacity>
              {/* <ThemedView style={tw` mt-2 `}>
              </ThemedView> */}
            </View>
            <View style={tw` w-[60%]`}>
              <Image
                resizeMode="contain"
                source={{ uri: slide.img }}
                alt={slide.title}
                style={tw`h-full w-full`}
              />
            </View>
          </ThemedView>
        ))}
      </PagerView>

      <View
        style={tw`flex-row items-start justify-center flex-wrap gap-x-7 mb-[22px]`}
      >
        {sliders.map((_, i) => (
          <TouchableOpacity
            onPress={() => {
              setCurrentPage(i);
              scrollToPage(i);
            }}
            key={i}
          >
            <View
              style={tw`h-[8px] ${
                currentPage === i ? "w-[20px]" : "w-[8px]"
              } rounded-full bg-gray-300`}
            >
              <View
                style={tw`h-full rounded-full ${
                  currentPage === i ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
        style={tw` absolute  flex-row gap-x-2  top-[${scale(
          24
        )}px] z-50 w-full  px-3 h-11`}
      >
        <Ionicons name="menu-outline" size={scale(24)} color="white" />
        <ThemedText
          accessibilityHint="App Name"
          accessibilityLabel="Ecom Store"
          style={tw` text-[${moderateScale(16)}px] text-white`}
          fontFamily="OpenSansSemiBold"
        >
          Ecom Store
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
};

export default memo(Slider);
