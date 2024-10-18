import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { fonts, tw } from "@/constants/theme";
import { StatusBar } from "react-native";
import { ThemedView } from "@/components/shared";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts(fonts);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemedView style={tw` flex-1`}>
      <GestureHandlerRootView style={tw` flex-1`}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BottomSheetModalProvider>
              <Stack
                initialRouteName="index"
                screenOptions={{ headerShown: false }}
              >
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(drawer)" />
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(orders)" />
                <Stack.Screen
                  options={{ animation: "slide_from_right" }}
                  name="(categories)"
                />
              </Stack>
            </BottomSheetModalProvider>
          </PersistGate>
        </Provider>
      </GestureHandlerRootView>
    </ThemedView>
  );
}
