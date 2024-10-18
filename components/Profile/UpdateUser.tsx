import { tw } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import React, { memo, MutableRefObject, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import {
  View,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
  Text,
  Alert,
} from "react-native";
import { scale } from "react-native-size-matters";
import { ThemedText } from "../shared";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

interface IUpdateUser {
  name: string;
  email: string;
  mobile: string;
  password?: string; // This will be handled by a separate API call, so not part of validation here
  displayImage: string;
}
interface IUpdateUserProps {
  onPress?: () => void;
  user: IUpdateUser;
}
const UpdateUser = React.forwardRef<BottomSheetModal, IUpdateUserProps>(
  ({ onPress, user }, ref) => {
    // React Hook Form setup

    const {
      register,
      setValue,
      handleSubmit,
      formState: { errors },
    } = useForm<IUpdateUser>({
      defaultValues: user,
    });
    const handleOkPress = useCallback(() => {
      if ((ref as MutableRefObject<BottomSheetModal>).current) {
        (ref as MutableRefObject<BottomSheetModal>).current.dismiss();
      }
    }, []);
    // Handle form submission
    const onSubmit = (data: IUpdateUser) => {
      Alert.alert(
        "Alert Title",
        "This is an alert message",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: handleOkPress, // Call the function here
          },
        ],
        { cancelable: false }
      );
    };

    return (
      <View style={tw`p-1`}>
        {/* Display Image */}
        <TouchableOpacity
          onPress={() => onPress?.()}
          style={tw` mx-auto w-[${scale(80)}px] h-[${scale(80)}px]  my-[${scale(
            7
          )}px]`}
        >
          <Image
            source={{
              uri: user.displayImage,
            }} // Display default image
            style={[tw` h-full w-full items-center rounded-full`]}
          />
          <View
            style={tw` absolute h-[50%] items-center justify-start bottom-0  w-full z-50 bg-black/30 rounded-b-full`}
          >
            <FontAwesome
              name="edit"
              size={scale(15)}
              style={tw` text-white -mt-3`}
            />
          </View>
        </TouchableOpacity>

        {/* Name Field */}
        <ThemedText style={tw` text-[${scale(12)}px] mb-[${scale(3)}px]`}>
          Name
        </ThemedText>
        <TextInput
          defaultValue={user.name}
          placeholder="Name"
          style={tw`border p-2 rounded-lg mb-2 border-gray-200`}
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <Text style={tw`text-red-500`}>{errors.name.message}</Text>
        )}

        {/* Email Field */}
        <ThemedText style={tw` text-[${scale(12)}px] mb-[${scale(3)}px]`}>
          Email
        </ThemedText>
        <TextInput
          defaultValue={user.email}
          placeholder="Email"
          keyboardType="email-address"
          style={tw`border p-2 rounded-lg mb-2 border-gray-200`}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Enter a valid email",
            },
          })}
        />
        {errors.email && (
          <Text style={tw`text-red-500`}>{errors.email.message}</Text>
        )}

        {/* Mobile Field */}
        <ThemedText style={tw` text-[${scale(12)}px] mb-[${scale(3)}px]`}>
          Mobile
        </ThemedText>
        <TextInput
          defaultValue={user.mobile}
          placeholder="Mobile"
          keyboardType="phone-pad"
          style={tw`border p-2 rounded-lg mb-2 border-gray-200`}
          {...register("mobile", {
            required: "Mobile number is required",
            pattern: {
              value: /^[0-9]+$/,
              message: "Mobile number must be numeric",
            },
          })}
        />
        {errors.mobile && (
          <Text style={tw`text-red-500`}>{errors.mobile.message}</Text>
        )}

        {/* Submit Button */}
        <View style={tw`mt-4`}>
          {/* <Button title="Update" onPress={handleSubmit(onSubmit)} /> */}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={tw` bg-gray-900 items-center justify-center h-12 w-full rounded `}
          >
            <ThemedText fontFamily="OpenSansSemiBold" style={tw` text-white`}>
              Update
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
);
export default UpdateUser;
