import {
  View,
  Text,
  TextInputProps,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useCallback } from "react";
import { tw } from "@/constants/theme";
import { EvilIcons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
interface ThemedTextInput extends TextInputProps {
  onPressSlider?: () => void;
  onPressClearInput?: () => void;
}
const ThemedTextInput = React.forwardRef<TextInput, ThemedTextInput>(
  (props, ref) => {
    const { style, value, onPressClearInput, onPressSlider, ...rest } = props;

    return (
      <View
        style={tw` h-[40px] w-full flex-row items-center rounded border  px-1  gap-x-1 border-gray-200`}
      >
        <EvilIcons name="search" size={25} style={tw` text-gray-500 mb-1`} />
        <TextInput style={tw` h-full  flex-1`} ref={ref} {...rest} />
        {value && onPressClearInput && (
          <TouchableOpacity onPress={() => onPressClearInput()}>
            <MaterialIcons
              name="clear"
              size={18}
              style={tw` mr-2 text-gray-500`}
            />
          </TouchableOpacity>
        )}
        {onPressSlider && (
          <TouchableOpacity onPress={() => onPressSlider()}>
            <FontAwesome
              name="sliders"
              // onPress={handleOpenModal}
              size={18}
              style={tw` mr-2 text-gray-500`}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
);

export default ThemedTextInput;
