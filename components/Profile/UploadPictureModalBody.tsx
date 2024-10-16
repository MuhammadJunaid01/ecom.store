import { View, Text, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { tw } from "@/constants/theme";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { scale, moderateVerticalScale } from "react-native-size-matters";
import { ThemedView, ThemedText } from "../shared";
import * as ImagePicker from "expo-image-picker";
interface IProps {
  onPress?: () => void;
  onPressUploadImageFromGallery?: (img: string) => void;
}
const UploadPictureModalBody: React.FC<IProps> = ({
  onPress,
  onPressUploadImageFromGallery,
}) => {
  return (
    <ThemedView style={tw` flex-1 h-full w-full px-3 bg-transparent`}>
      <BottomSheetScrollView
        contentContainerStyle={tw` flex-grow`}
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={tw` mt-[${scale(20)}px] h-[${moderateVerticalScale(
            40
          )}px] w-[90%] mx-auto   flex-row items-center gap-x-2`}
        >
          <TouchableOpacity
            onPress={async () => {
              let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
              });

              if (!result.canceled) {
                const image = result.assets[0].uri;
                onPressUploadImageFromGallery?.(image);
                //   onPress?.();
                //   setImage(result.assets[0].uri);
              }
              // bottomSheetModalImageUploadRef.current?.dismiss();
            }}
            style={tw` shadow-md my-[${scale(
              2
            )}px] bg-white rounded-md flex-row gap-x-1 items-center px-2 justify-center h-full flex-1`}
          >
            <FontAwesome
              name="picture-o"
              size={scale(17)}
              style={tw` text-gray-600`}
            />
            <ThemedText style={tw` text-[${scale(10)}px] text-gray-500`}>
              Chose From Gallery
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPress?.()}
            style={tw` shadow-md my-[${scale(
              2
            )}px] bg-white flex-row gap-x-1 rounded-md  items-center  px-2 justify-around h-full flex-1`}
          >
            <Ionicons
              name="camera"
              size={scale(22)}
              style={tw` text-gray-600`}
            />
            <ThemedText style={tw` text-[${scale(10)}px] text-gray-500`}>
              Take a Photo
            </ThemedText>
          </TouchableOpacity>
        </View>
      </BottomSheetScrollView>
    </ThemedView>
  );
};

export default UploadPictureModalBody;
