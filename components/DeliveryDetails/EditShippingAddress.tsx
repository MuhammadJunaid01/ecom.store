import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { MutableRefObject, useCallback, useMemo } from "react";
import { AddressFormData, IEcomAddress } from "@/lib/interfaces";
import { tw } from "@/constants/theme";
import showToast from "@/lib/utils/showToast";
import { convertCamelCase } from "@/lib/utils/utility";
import { addDeliveryAddress } from "@/redux/features/userSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { scale } from "react-native-size-matters";
import { ThemedText } from "../shared";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
interface IProps {
  address: IEcomAddress;
}
const EditShippingAddress = React.forwardRef<BottomSheetModal, IProps>(
  ({ address }, ref) => {
    const dispatch = useAppDispatch();
    const addressTypes = useMemo(() => ["Home", "Shop", "Office"], []);
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      watch,
      reset,
    } = useForm<AddressFormData>({
      defaultValues: {
        state: address.state,
        city: address.city,
        postalCode: address.postalCode,
        street: address.street,
        title: address.addressType,
      },
    });
    const selectedTitle = watch("title");
    const onSubmit = useCallback(
      async (data: AddressFormData) => {
        try {
          const payloadAddress: IEcomAddress = {
            // _id: address?._id,
            addressType: data.title as string,
            street: data.street,
            city: data.city,
            state: data.state,
            postalCode: data.postalCode,
            country: data.country,
          };
          console.log("data", data);
          dispatch(addDeliveryAddress(payloadAddress));
          if ((ref as MutableRefObject<BottomSheetModal>).current) {
            (ref as MutableRefObject<BottomSheetModal>).current?.dismiss();
          }
          // router.replace("/(drawer)/(tabs)/place-order");
          // router.push("/(drawer)/(tabs)/place-order");

          reset();
        } catch (error: any) {
          showToast({ type: "error", message: error?.data?.message });
        }
      },
      [selectedTitle]
    );
    return (
      <View style={tw` w-full flex-1 `}>
        <BottomSheetScrollView style={tw` flex-grow w-full  `}>
          {/* Street */}
          <View style={tw`mb-4 w-full`}>
            <ThemedText
              style={tw`mb-1 text-[${scale(12)}px]  font-normal text-gray-800`}
            >
              Street Address
            </ThemedText>
            <Controller
              control={control}
              name="street"
              defaultValue={address?.street}
              rules={{
                required: "Street is required",
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Street must contain only letters",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={tw`border border-gray-300 px-3 py-2 rounded-md`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  placeholder="Apartment, House, Road, Block, Area, etc."
                  // defaultValue={address?.street}
                />
              )}
            />
            {errors.street && (
              <ThemedText style={tw`text-red-500`}>
                {errors.street.message}
              </ThemedText>
            )}
          </View>
          {/* City */}
          <View style={tw`mb-4 w-full`}>
            <ThemedText
              style={tw`mb-1 text-[${scale(12)}px] font-normal text-gray-800`}
            >
              City
            </ThemedText>
            <Controller
              control={control}
              name="city"
              defaultValue={address?.city}
              rules={{
                required: "City is required",
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Street must contain only letters",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={tw`border border-gray-300 px-3 rounded-md py-2`}
                  onBlur={onBlur}
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  placeholder="Dhaka, Narayanganj, Gazipur, etc."
                  defaultValue={address?.city}
                />
              )}
            />
            {errors.city && (
              <ThemedText style={tw`text-red-500`}>
                {errors.city.message}
              </ThemedText>
            )}
          </View>

          <View style={tw`mb-4 w-full`}>
            <ThemedText
              style={tw`mb-1 text-[${scale(12)}px] font-normal text-gray-800`}
            >
              State/Division
            </ThemedText>
            <Controller
              control={control}
              name="state"
              defaultValue={address?.state}
              rules={{
                required: "State is required",
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Street must contain only letters",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={tw`border border-gray-300 text-[${scale(
                    12
                  )}px] p-3 text-black rounded-md`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  // autoFocus
                  defaultValue={address?.state}
                  placeholder="Dhaka, Chittagong, Sylhet, etc."
                />
              )}
            />
            {errors.state && (
              <ThemedText style={tw`text-red-500`}>
                {errors.state.message}
              </ThemedText>
            )}
          </View>
          <View style={tw`mb-4 w-full`}>
            <ThemedText
              style={tw`mb-1 text-[${scale(12)}px] font-normal text-gray-800`}
            >
              Country
            </ThemedText>
            <Controller
              control={control}
              name="country"
              defaultValue={address?.state}
              rules={{
                required: "Country is required",
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Country must contain only letters",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={tw`border border-gray-300 text-[${scale(
                    12
                  )}px] p-3 text-black rounded-md`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  // autoFocus
                  defaultValue={address?.state}
                  placeholder="Dhaka, Chittagong, Sylhet, etc."
                />
              )}
            />
            {errors.country && (
              <ThemedText style={tw`text-red-500`}>
                {errors.country.message}
              </ThemedText>
            )}
          </View>
          {/* Postal Code */}
          <View style={tw`mb-4 w-full`}>
            <ThemedText
              style={tw`mb-1 text-[${scale(12)}px] font-normal  text-gray-800`}
            >
              Postal Code
            </ThemedText>
            <Controller
              control={control}
              name="postalCode"
              // defaultValue={address?.postalCode}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={tw`border border-gray-300 px-3 py-2 rounded-md`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  placeholder="Enter your postal code (optional)"
                  keyboardType="numeric"
                  defaultValue={address?.postalCode}
                />
              )}
            />
            {/* {errors.postalCode && (
              <ThemedText style={tw`text-red-500`}>{errors.postalCode.message}</ThemedText>
            )} */}
          </View>

          <View style={tw`my-5 w-full `}>
            <ThemedText style={tw`mb-2 text-[${scale(12)}px] font-normal`}>
              Save this address for future use as
            </ThemedText>

            <View style={tw`flex-row justify-between gap-x-3`}>
              {addressTypes.map((address, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    setValue("title", address, { shouldValidate: true });
                    handleSubmit(onSubmit)();
                  }}
                  style={tw`flex-auto border-b pb-1 flex-row items-center justify-center gap-x-1 ${
                    selectedTitle === address
                      ? " border-gray-900"
                      : " border-transparent"
                  } rounded mr-2`}
                >
                  {/* icon */}
                  {address.toLowerCase() === "home" ? (
                    <Entypo name="home" size={17} color="black" />
                  ) : address.toLowerCase() === "office" ? (
                    <MaterialCommunityIcons
                      name="office-building"
                      size={17}
                      color="black"
                    />
                  ) : address.toLowerCase() === "shop" ? (
                    <Entypo name="location-pin" size={18} color="black" />
                  ) : null}
                  <ThemedText
                    style={tw`text-center text-sm font-medium text-black`}
                  >
                    {address}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
            <Controller
              control={control}
              name="title"
              rules={{ required: "Address type is required" }}
              render={({}) => (
                <>
                  {errors.title && (
                    <ThemedText style={tw`text-red-500`}>
                      {errors.title.message}
                    </ThemedText>
                  )}
                </>
              )}
            />
          </View>
        </BottomSheetScrollView>
      </View>
    );
  }
);

export default EditShippingAddress;
