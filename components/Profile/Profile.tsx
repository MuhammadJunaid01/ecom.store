import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Button,
  TextInput,
  Modal,
} from "react-native";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { IUser } from "@/lib/interfaces";
import { moderateVerticalScale, scale, tw } from "@/constants/theme";
import * as ImagePicker from "expo-image-picker";
import LottieView from "lottie-react-native";

import { BottomModal, ThemedText, ThemedView } from "../shared";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useForm } from "react-hook-form";
import { CameraView, useCameraPermissions } from "expo-camera";
import { ProfileTab, UpdateUser, UploadPictureModalBody } from ".";
import UniversalCamera from "../shared/UniversalCamera";
import { router } from "expo-router";
interface IProps {
  user?: IUser;
}

const Profile: React.FC<IProps> = ({ user }) => {
  const cameraRef = useRef<CameraView>(null);
  const [isTakePicture, setIsTakePicture] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [permission, requestCameraPermission] = useCameraPermissions();
  const [isUploadImage, setIsUploadImage] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "John Doe", // Default value for name
    email: "john.doe@example.com", // Default value for email
    mobile: "1234567890", // Default value for mobile
    displayImage: "https://randomuser.me/api/portraits/women/26.jpg", // Default display image
  });
  useEffect(() => {
    if (!status?.status) {
      requestPermission();
    }
    if (!permission?.status) {
      requestCameraPermission();
    }
  }, []);

  return (
    <View style={tw` flex-1 bg-transparent`}>
      <StatusBar barStyle={"light-content"} />
      <View style={tw` h-[${moderateVerticalScale(160)}px] w-full `}>
        <View
          style={tw` bg-gray-900 h-full w-full items-center justify-center  `}
        >
          <LottieView
            source={require("@/assets/lotti-image/Animation - 1729059743591.json")}
            style={{ width: "100%", height: "100%" }}
            autoPlay
            loop={false}
          />
          <View
            style={tw` absolute left-3 top-[${moderateVerticalScale(
              160 / 2
            )}px]`}
          >
            <ThemedText
              fontFamily="OpenSansBold"
              style={tw` text-white  text-[${scale(14)}px]   tracking-wider`}
            >
              Welcome
            </ThemedText>
            <ThemedText
              style={tw` text-white  text-[${moderateVerticalScale(
                11
              )}px] tracking-widest`}
            >
              Ecom Store
            </ThemedText>
          </View>
        </View>
      </View>
      <View
        style={tw` mt-[-33px]  flex-row   justify-between   shadow-2xl bg-white rounded-full  `}
      >
        <View style={tw` flex-row p-1 gap-x-[${scale(7)}px]`}>
          <Image
            source={{ uri: userInfo.displayImage }}
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
          onPress={() => {
            setIsUploadImage(false);
            bottomSheetModalRef.current?.present();
          }}
          style={tw`  absolute  right-[${scale(0)}] -top-[${scale(
            1
          )}] bg-gray-900 flex-row rounded-full h-[${scale(33)}px] w-[${scale(
            33
          )}px] items-center justify-center`}
        >
          <FontAwesome
            name="edit"
            size={scale(15)}
            style={tw` text-gray-50 ml-1`}
          />
        </TouchableOpacity>
      </View>
      {/* Profile Info */}
      <View style={tw`  flex-1 `}>
        <ScrollView
          contentContainerStyle={tw` px-3 flex-col gap-2 my-3 `}
          showsVerticalScrollIndicator={false}
        >
          <ProfileTab
            title="My Order"
            onPress={() => router.push("/(orders)/my-orders" as any)}
            label="Already have 12 orders"
          />
          <ProfileTab title="Shipping Addresses" label="3 Address" />
          <ProfileTab title="Payment methods" label="Visa  **88" />
          <ProfileTab title="Promocodes" label="You have special promocodes" />
          <ProfileTab title="My reviews" label="Reviews for 4 items" />
          <ProfileTab title="Settings" label="Notifications, password" />
        </ScrollView>
      </View>
      <BottomModal
        defaultIndex={isUploadImage ? 0 : 2}
        ref={bottomSheetModalRef}
        ModalBody={() => (
          <ThemedView style={tw` flex-1 h-full w-full   px-3 bg-transparent`}>
            <BottomSheetScrollView
              contentContainerStyle={tw` flex-grow`}
              showsHorizontalScrollIndicator={false}
            >
              {isUploadImage ? (
                <UploadPictureModalBody
                  onPressUploadImageFromGallery={(img) => {
                    setUserInfo((prev) => ({ ...prev, displayImage: img }));
                    // bottomSheetModalRef.current?.dismiss();
                    setIsTakePicture(false);
                    setIsUploadImage(false);
                  }}
                  onPress={() => {
                    setIsTakePicture(true);
                    bottomSheetModalRef.current?.dismiss();
                    console.log("HELLO");
                    // bottomSheetModalImageUploadRef.current?.dismiss();
                  }}
                />
              ) : (
                <UpdateUser
                  ref={bottomSheetModalRef}
                  user={userInfo}
                  onPress={() => {
                    setIsUploadImage(true);
                    // bottomSheetModalRef.current?.dismiss();
                    // bottomSheetModalImageUploadRef.current?.present();
                  }}
                />
              )}
            </BottomSheetScrollView>
          </ThemedView>
        )}
      />
      <Modal
        animationType="slide" // 'none', 'slide', or 'fade'
        transparent={true} // Makes the modal background transparent
        visible={isTakePicture} // Control modal visibility with state
        onRequestClose={() => setIsTakePicture(false)}
        statusBarTranslucent
      >
        <View style={tw`flex-1 `}>
          <UniversalCamera
            onCameraClose={() => {
              setIsTakePicture(false);
            }}
            ref={cameraRef}
            onPressTakePicture={async () => {
              if (cameraRef.current) {
                const photo = await cameraRef.current.takePictureAsync();

                setUserInfo((prev) => ({
                  ...prev,
                  displayImage: photo?.uri as string,
                }));
                setIsTakePicture(false);
              }
              // setCapturedPhoto(photo.uri); // Save the photo URI to display it
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Profile;
