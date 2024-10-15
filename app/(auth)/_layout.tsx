import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={
        {
          // headerBackButtonMenuEnabled,
        }
      }
      initialRouteName="sign-in"
    >
      <Stack.Screen
        name="sign-in"
        options={{
          title: "SignIn",
          headerShadowVisible: false,
          headerTitleStyle: { fontFamily: "OpenSansSemiBold" },
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
