import { View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import React, { useCallback, useMemo } from "react";
import { scale, tw } from "@/constants/theme";
import { Controller, useForm } from "react-hook-form";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import showToast from "@/lib/utils/showToast";
import { ThemedText } from "@/components/shared";
import { convertCamelCase } from "@/lib/utils/utility";
export interface AddressFormData {
  state: string;
  city: string;
  postalCode: string;
  street: string;
  title: string;
  country: string;
}
const DeliveryDetails = () => {
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
      state: "",
      city: "",
      postalCode: "",
      street: "",
      title: "",
    },
  });
  const selectedTitle = watch("title");
  const onSubmit = useCallback(
    async (data: AddressFormData) => {
      try {
        const payloadAddress = {
          // _id: defaultDeliveryAddress?._id,
          addressType: data.title as string,
          street: data.street,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          country: data.country,
        };
        console.log("data", data);
      } catch (error: any) {
        showToast({ type: "error", message: error?.data?.message });
      }
    },
    [selectedTitle]
  );
  return (
    <View style={tw` flex-1 h-full w-full bg-white px-3 pt-1`}>
      <ScrollView contentContainerStyle={tw` flex-grow `}>
        <View style={tw` w-full flex-1 items-center justify-center`}>
          <ThemedText
            accessibilityLabel="PLEASE CONFIRM THE DELIVERY DETAILS"
            accessible
            accessibilityHint="Confirm delivery address"
            ellipsizeMode="tail"
            numberOfLines={2}
            fontFamily="OpenSansSemiBold"
            style={tw` text-[${scale(18)}px] w-full mb-7`}
          >
            {convertCamelCase("PLEASE CONFIRM THE DELIVERY DETAILS")}
          </ThemedText>
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
              // defaultValue={defaultDeliveryAddress?.street}
              rules={{
                required: "Street is required",
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Street must contain only letters",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={tw`border border-gray-300 px-3 py-2`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  placeholder="Apartment, House, Road, Block, Area, etc."
                  // defaultValue={defaultDeliveryAddress?.street}
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
              // defaultValue={defaultDeliveryAddress?.city}
              rules={{
                required: "City is required",
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Street must contain only letters",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={tw`border border-gray-300 px-3 py-2`}
                  onBlur={onBlur}
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  placeholder="Dhaka, Narayanganj, Gazipur, etc."
                  // defaultValue={defaultDeliveryAddress?.city}
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
              // defaultValue={defaultDeliveryAddress?.state}
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
                  )}px] p-3 text-black`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  // autoFocus
                  // defaultValue={defaultDeliveryAddress?.state}
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
              // defaultValue={defaultDeliveryAddress?.state}
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
                  )}px] p-3 text-black`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  // autoFocus
                  // defaultValue={defaultDeliveryAddress?.state}
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
          {/* Postal Code */}
          <View style={tw`mb-4 w-full`}>
            <ThemedText
              style={tw`mb-1 text-[${scale(12)}px] font-normal text-gray-800`}
            >
              Postal Code
            </ThemedText>
            <Controller
              control={control}
              name="postalCode"
              // defaultValue={defaultDeliveryAddress?.postalCode}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={tw`border border-gray-300 px-3 py-2`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  placeholder="Enter your postal code (optional)"
                  keyboardType="numeric"
                  // defaultValue={defaultDeliveryAddress?.postalCode}
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
        </View>
      </ScrollView>
    </View>
  );
};

export default DeliveryDetails;
