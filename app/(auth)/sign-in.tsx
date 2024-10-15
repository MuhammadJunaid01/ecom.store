/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActivityIndicator,
  Image,
  Keyboard,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";

import { useAppDispatch } from "@/redux/hooks";
import { router, useLocalSearchParams } from "expo-router";
import { clearSecureStorage, MySecureStore } from "@/lib/utils/secure-store";
import { Controller, useForm } from "react-hook-form";
import { scale, screen, tw } from "@/constants/theme";
import { isLoading } from "expo-font";
import { ThemedText } from "@/components/shared";
import showToast from "@/lib/utils/showToast";
import { loginUser } from "@/redux/features/userSlice";

type SignInFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { redirectTo } = useLocalSearchParams();
  const getStoredCredentials = async () => {
    const email = await MySecureStore.getValueFor("email");
    const password = await MySecureStore.getValueFor("password");
    const credentials = { email, password };
    return credentials;
  };
  const dispatch = useAppDispatch();

  const onSubmit = async (data: SignInFormData) => {
    Keyboard.dismiss();
    // Handle successful sign-in
    console.log("data", data);
    dispatch(loginUser({ email: data.email, password: data.password }));
    reset();
    router.replace(redirectTo as any);
  };

  const hasPasswordFound = async () => {
    const credentials = await getStoredCredentials();
    if (credentials.password && credentials.email) {
      // setiIsPasswordHasSecureStorage(true);
      //   setState((prev) => ({ ...prev, isPasswordHasSecureStorage: true }));
      // } else {
      // setState((prev) => ({ ...prev, isPasswordHasSecureStorage: false }));
    }
  };
  useEffect(() => {
    (async () => {
      await LocalAuthentication.hasHardwareAsync();
      // setState((prev) => ({ ...prev, isBiometricSupport: compatible }));
    })();
    hasPasswordFound();
  }, []);
  const fallBackToDefaultAuth = () => {};
  const handleBiometricAuth = async () => {
    // check if hardware supports biometric
    const isBioMetricAvailable = await LocalAuthentication.hasHardwareAsync();
    // fallback to default auth
    if (!isBioMetricAvailable) {
      fallBackToDefaultAuth();
    }
    // check available biometric types(fingerprint, face id)

    if (isBioMetricAvailable) {
      await LocalAuthentication.supportedAuthenticationTypesAsync();
    }
    //check if biometrics are saved locally on user's device
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics) {
      fallBackToDefaultAuth();
    }
    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login with biometric",
      cancelLabel: "cancel",
      disableDeviceFallback: isBioMetricAvailable,
      fallbackLabel: "usepasscode",
    });
    if (biometricAuth) {
      const credentials = await getStoredCredentials();

      try {
        if (biometricAuth.success) {
          //LOGIN
        } else {
          if (biometricAuth.error === "not_available") {
            showToast({
              type: "error",
              message: "Authentication not_available",
            });
          } else if (biometricAuth.error === "user_cancel") {
            showToast({
              type: "error",
              message: "Authentication canceled by the user.",
            });
          } else if (biometricAuth.error === "user_fallback") {
            showToast({
              type: "error",
              message:
                "User chose to enter passcode or use another authentication method.",
            });
          } else if (biometricAuth.error === "biometry_lockedout") {
            showToast({
              type: "error",
              message: "Biometry locked out due to too many failed attempts.",
            });
          } else if (biometricAuth.error === "biometry_not_enrolled") {
            showToast({
              type: "error",
              message:
                "Biometry not enrolled. Please set up biometric authentication in device settings.",
            });
          } else if (biometricAuth.error === "biometry_no_match") {
            showToast({
              type: "error",
              message: "Fingerprint does not match. Please try again.",
            });
          } else {
            showToast({
              type: "error",
              message: `Authentication failed: ${biometricAuth.error}`,
            });
          }
        }
      } catch (e: any) {
        showToast({
          type: "error",
          message: `Authentication failed: ${e?.data?.message}`,
        });
        // setState((prev) => ({
        //   ...prev,
        //   loginError: e.error || "Something went wrong",
        // }));
      }
    }
  };
  useEffect(() => {
    if (__DEV__) {
      handleAutoLogin();
    }
  }, []);
  const handleAutoLogin = async () => {
    const credentials = await getStoredCredentials();
  };
  return (
    <View style={tw` flex-1 h-full w-full px-4  bg-white `}>
      {/* <View style={tw` mt-[${screen.height * 0.099}px]`} /> */}
      <View style={tw` flex-1`}>
        <ScrollView
          contentContainerStyle={tw` flex-grow`}
          showsVerticalScrollIndicator={false}
        >
          <View style={tw`  `}>
            <View style={tw`     mb-0`}>
              <View style={tw` h-24 w-24 `}>
                {/* <Image
                  style={tw`  h-full w-auto  `}
                  source={require("@/assets/images/shukranLogo.png")}
                  resizeMode="contain"
                /> */}
              </View>
            </View>
          </View>

          <View style={tw`mb-4`}>
            <ThemedText style={tw`mb-1`}>Email</ThemedText>
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={tw`border border-gray-300 py-2 px-3 `}
                  onBlur={onBlur}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                  placeholder="Enter your email"
                />
              )}
            />
            {errors.email && (
              <ThemedText style={tw`text-red-500`}>
                {errors.email.message}
              </ThemedText>
            )}
          </View>
          <View style={tw`mb-4`}>
            <ThemedText style={tw`mb-1`}>Password</ThemedText>
            <Controller
              control={control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View
                  style={tw`border border-gray-300  px-3 p-2  flex-row justify-between items-center`}
                >
                  <TextInput
                    style={tw`flex-1`}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="none"
                    // autoComplete="password"
                    placeholder="Enter your password"
                    secureTextEntry={!isPasswordVisible}
                  />
                  <TouchableOpacity
                    onPress={() => setPasswordVisible(!isPasswordVisible)}
                  >
                    <Feather
                      name={isPasswordVisible ? "eye" : "eye-off"}
                      size={20}
                      color="gray"
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
            {errors.password && (
              <ThemedText style={tw`text-red-500`}>
                {errors.password.message}
              </ThemedText>
            )}
          </View>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Tap For Sign Up"
            onPress={handleSubmit(onSubmit)}
            style={tw` bg-gray-900 py-2 rounded flex-row  justify-center items-center gap-x-5`}
          >
            <ThemedText style={tw`text-center text-white text-lg font-bold`}>
              Sign In
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw` mt-3`}
            accessible={true}
            accessibilityLabel="Forgot password"
            // onPress={() => {
            //   router.push("/(auth)/forgot-password");
            //   clearSecureStorage();
            // }}
          >
            <ThemedText fontFamily="OpenSansMedium" style={tw`  text-center  `}>
              Forgot your password?
            </ThemedText>
          </TouchableOpacity>

          <View style={tw` flex-1 items-center justify-center   h-full  `}>
            <TouchableOpacity
              accessibilityLabel="Tap For finger-print Auth"
              onPress={handleBiometricAuth}
              // style={tw` mt-[-8px]`}
              // style={tw` items-center ${
              //   getDeviceSize() === "small" ? " mt-5" : ""
              // }`}
            >
              <Ionicons
                name="finger-print-sharp"
                size={scale(40)}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <View style={tw` justify-center pb-6   items-center w-full`}>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Tap For  Create New Account"
              style={tw`  px-4 py-1 border border-gray-200 rounded-full`}
              // onPress={() => router.replace("/(auth)/sign-up")}
              // style={tw` absolute bottom-[${
              //   screen.height < 640 ? "0px" : "-12px"
              // }]`}
            >
              <ThemedText fontFamily="OpenSansRegular">
                Create New Account
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Login;
