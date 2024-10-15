import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Button,
  TextInput,
  ImageBackground,
} from "react-native";
import React, { memo, useRef } from "react";
import { IUser } from "@/lib/interfaces";
import { moderateVerticalScale, scale, tw } from "@/constants/theme";
import { BottomModal, ThemedText, ThemedView } from "./shared";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useForm } from "react-hook-form";
interface IProps {
  user?: IUser;
}
const Profile: React.FC<IProps> = ({ user }) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  return (
    <View style={tw` flex-1 bg-transparent`}>
      <StatusBar barStyle={"light-content"} />
      <View style={tw` h-[${moderateVerticalScale(160)}px] w-full `}>
        <Image
          source={{
            uri: "https://api.slingacademy.com/public/sample-photos/26.jpeg",
          }}
          style={tw` h-full w-full  `}
          resizeMode="cover"
        />
      </View>
      <View
        style={tw` mt-[-10px]  flex-row   justify-between   shadow-2xl bg-white rounded-full  `}
      >
        <View style={tw` flex-row gap-x-[${scale(7)}px]`}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/women/26.jpg" }}
            width={scale(60)}
            height={scale(60)}
            style={tw` rounded-full items-center justify-center`}
          />
          <View style={tw` items-center justify-center`}>
            <ThemedText
              fontFamily="OpenSansSemiBold"
              style={tw` text-[${scale(19)}px] tracking-wider`}
            >
              John Doe
            </ThemedText>
            <ThemedText
              fontFamily="OpenSansRegular"
              style={tw` text-[${scale(11)}px] text-gray-600 tracking-wider`}
            >
              john@email.com
            </ThemedText>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => bottomSheetModalRef.current?.present()}
          style={tw`  absolute  right-[${scale(0)}] -top-[${scale(
            1
          )}] bg-white rounded-full h-[${scale(33)}px] w-[${scale(
            33
          )}px] items-center justify-center`}
        >
          <FontAwesome
            name="edit"
            size={scale(15)}
            style={tw` text-gray-700`}
          />
        </TouchableOpacity>
      </View>
      {/* Profile Info */}
      <View style={tw`  flex-1 `}>
        <ScrollView
          contentContainerStyle={tw` px-3 flex-col gap-2 my-3 `}
          showsVerticalScrollIndicator={false}
        >
          <ProfileTab title="My Order" label="Already have 12 orders" />
          <ProfileTab title="Shipping Addresses" label="3 Address" />
          <ProfileTab title="Payment methods" label="Visa  **88" />
          <ProfileTab title="Promocodes" label="You have special promocodes" />
          <ProfileTab title="My reviews" label="Reviews for 4 items" />
          <ProfileTab title="Settings" label="Notifications, password" />
        </ScrollView>
      </View>
      <BottomModal
        defaultIndex={2}
        ref={bottomSheetModalRef}
        ModalBody={() => (
          <ThemedView style={tw` flex-1 h-full w-full px-3 bg-transparent`}>
            <BottomSheetScrollView
              contentContainerStyle={tw` flex-grow`}
              showsHorizontalScrollIndicator={false}
            >
              <UpdateUserForm />
            </BottomSheetScrollView>
          </ThemedView>
        )}
      />
    </View>
  );
};

export default Profile;
interface IProfileTab {
  title: string;
  label: string;
  onPress?: () => void;
}
const ProfileTab: React.FC<IProfileTab> = memo(({ title, label, onPress }) => {
  return (
    <View
      style={tw`   bg-transparent  border-b border-gray-100 h-[${scale(
        72
      )}px]  flex-row px-2 rounded  justify-between items-center gap-y-[${scale(
        3
      )}px] py-[${scale(10)}px] `}
    >
      <View>
        <ThemedText
          fontFamily="OpenSansBold"
          style={tw` leading-8 text-gray-800 text-[${scale(14)}px]`}
        >
          {title}
        </ThemedText>
        <ThemedText
          fontFamily="OpenSansRegular"
          style={tw` text-gray-500 text-[${scale(11)}px]`}
        >
          {label}
        </ThemedText>
      </View>
      <TouchableOpacity
        onPress={() => onPress?.()}
        style={tw` h-[${scale(33)}px] w-[${scale(
          33
        )}px] items-center justify-center`}
      >
        <AntDesign
          name="right"
          size={scale(19)}
          style={tw` mt-1 text-gray-700`}
        />
      </TouchableOpacity>
    </View>
  );
});
interface IUpdateUserForm {
  name: string;
  email: string;
  mobile: string;
  password?: string; // This will be handled by a separate API call, so not part of validation here
  displayImage: string;
}

const UpdateUserForm = () => {
  // React Hook Form setup
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateUserForm>({
    defaultValues: {
      name: "John Doe", // Default value for name
      email: "john.doe@example.com", // Default value for email
      mobile: "1234567890", // Default value for mobile
      displayImage: "https://example.com/avatar.jpg", // Default display image
    },
  });

  // Handle form submission
  const onSubmit = (data: IUpdateUserForm) => {
    console.log("Form Data:", data);
    // Call your API to update the user information
  };

  return (
    <View style={tw`p-1`}>
      {/* Display Image */}
      <TouchableOpacity
        style={tw` mx-auto w-[${scale(80)}px] h-[${scale(80)}px]  my-[${scale(
          7
        )}px]`}
      >
        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/women/26.jpg",
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
      <TextInput
        placeholder="Name"
        style={tw`border p-2 rounded-lg mb-2`}
        {...register("name", { required: "Name is required" })}
      />
      {errors.name && (
        <Text style={tw`text-red-500`}>{errors.name.message}</Text>
      )}

      {/* Email Field */}
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        style={tw`border p-2 rounded-lg mb-2`}
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
      <TextInput
        placeholder="Mobile"
        keyboardType="phone-pad"
        style={tw`border p-2 rounded-lg mb-2`}
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
        <Button title="Update" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};
