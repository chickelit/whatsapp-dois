import { useFontLoader } from "@/hooks/useFontLoader";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { SecureStore } from "@/helpers/SecureStore";
import { UserApi } from "@/api/UserApi";
import { useUserStore } from "@/store/useUserStore";
import { useChatStore } from "@/store/useChatStore";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFontLoader();
  const [isResolved, setIsResolved] = useState(false);
  const userStore = useUserStore();

  useEffect(() => {
    {
      (async () => {
        try {
          const token = await SecureStore.get("token");

          if (!token) return;

          const { user } = await UserApi.getAccount(token);

          if (!user) return;

          userStore.setUser(user);
        } catch (error) {
          console.log(error);
        } finally {
          setIsResolved(true);
        }
      })();
    }
  }, []);

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded && isResolved) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error, isResolved]);

  if (!isResolved || (!fontsLoaded && !error)) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="chat" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
