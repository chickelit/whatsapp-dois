import { Image, Text, TouchableHighlight, View } from "react-native";
import React, { useEffect } from "react";
import CustomLoadingBar from "@/components/CustomLoadingBar";
import TabHeader from "@/components/TabHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "@/store/useUserStore";
import { useLoadingStore } from "@/store/useLoadingStore";
import icons from "@/constants/icons";
import { SecureStore } from "@/helpers/SecureStore";
import { router } from "expo-router";

const Profile = () => {
  const setIsLoading = useLoadingStore((store) => store.setIsLoading);
  const user = useUserStore((store) => store.user);
  const setUser = useUserStore((store) => store.setUser);

  console.log(user);

  return (
    <SafeAreaView className="h-screen w-screen bg-primary relative">
      <TabHeader>
        <CustomLoadingBar />
        <Text className="h-min text-2xl font-psemibold text-white">Minha conta</Text>
      </TabHeader>
      <View>
        <TouchableHighlight
          onPress={async () => {
            await SecureStore.remove("token");
            setUser(undefined);
            router.push("/sign-in");
          }}
        >
          <Image source={icons.logout} />
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
