import React from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { MaterialIcons } from "@expo/vector-icons";
import { tw } from "@/constants/theme";
import ThemedText from "./ThemedText";

interface DropDownProps {
  title: string;
  body: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  expandedViewHeight?: number;
}

const DropDown: React.FC<DropDownProps> = ({
  title,
  body,
  isExpanded,
  onToggle,
  expandedViewHeight = 120,
}) => {
  const height = useSharedValue(isExpanded ? 1 : 0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value * expandedViewHeight,
      overflow: "hidden",
    };
  }, [isExpanded]);

  React.useEffect(() => {
    height.value = withTiming(isExpanded ? 1 : 0, {
      duration: 300,
      easing: Easing.ease,
    });
  }, [isExpanded]);

  return (
    <View style={tw`border-b border-gray-200 w-full`}>
      <TouchableOpacity onPress={onToggle} style={tw`py-2.7`}>
        <View style={tw`flex-row`}>
          <ThemedText fontFamily="OpenSansMedium" style={tw`text-base w-[90%]`}>
            {title}
          </ThemedText>

          <View>
            {isExpanded ? (
              <MaterialIcons name="expand-less" size={24} color="black" />
            ) : (
              <MaterialIcons name="expand-more" size={24} color="black" />
            )}
          </View>
        </View>
      </TouchableOpacity>
      <Animated.View style={[tw`py-0`, animatedStyle]}>
        <ScrollView
          style={tw` w-full  `}
          // contentContainerStyle={tw` flex-grow w-full `}
          nestedScrollEnabled
        >
          <View style={tw` flex-1 w-full `}>{body}</View>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default DropDown;
