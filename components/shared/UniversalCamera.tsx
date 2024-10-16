import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useFocusEffect } from "expo-router";
import { tw } from "@/constants/theme";
import { Feather, EvilIcons } from "@expo/vector-icons";
interface IProps {
  onPressTakePicture: () => void;
}
const UniversalCamera = React.forwardRef<CameraView, IProps>(
  ({ onPressTakePicture }, ref) => {
    const [cameraReady, setCameraReady] = useState(false);

    const [permission, requestPermission] = useCameraPermissions();
    const [isFocused, setIsFocused] = useState(false);
    React.useEffect(() => {
      (async () => {
        requestPermission();
      })();
    }, []);
    useFocusEffect(
      useCallback(() => {
        setIsFocused(true);
        return () => {
          setIsFocused(false);
        };
      }, [])
    );
    if (permission?.status === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (permission?.granted === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={tw`flex-1  flex-col justify-center`}>
        {isFocused && (
          <View style={tw` flex-1`}>
            <CameraView
              ref={ref}
              style={tw`flex-1`}
              facing="back"
              onCameraReady={() => setCameraReady(true)}
              // ratio="1:1"
              // type={Camera.Constants.Type.back}
              // onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            >
              <View style={tw` flex-1 items-center  w-full`}>
                <View
                  style={tw` flex-row  items-center  justify-around  absolute  bottom-6 `}
                >
                  <TouchableOpacity
                    onPress={() => {
                      if (cameraReady) {
                        onPressTakePicture();
                      }
                    }}
                    style={tw` overflow-hidden h-14 w-14 items-center justify-center bg-white rounded-full`}
                  >
                    <View
                      style={tw` h-[50px] w-[50px] overflow-hidden items-center justify-center  bg-gray-900 rounded-full`}
                    >
                      <View
                        style={tw` h-[45px] w-[45px] overflow-hidden items-center justify-center  bg-white rounded-full`}
                      >
                        <Feather name="camera" size={20} color="black" />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={tw` absolute  top-11 right-4`}>
                  <TouchableOpacity>
                    <EvilIcons
                      name="close"
                      size={27}
                      style={tw` text-gray-50`}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </CameraView>
          </View>
        )}
      </View>
    );
  }
);

export default UniversalCamera;
