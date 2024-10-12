import { Platform, ToastAndroid } from "react-native";
import Toast from "react-native-toast-message";
const showToast = ({
  type,
  toastTitle,
  message,
}: {
  type: "success" | "error" | "info";
  toastTitle?: string;
  message: string;
}) => {
  if (Platform.OS !== "ios") {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  } else {
    Toast.show({
      type: type,
      text1: toastTitle,
      text2: message,
      autoHide: true,
      swipeable: true,
      visibilityTime: 1000,
    });
  }
};
export default showToast;
