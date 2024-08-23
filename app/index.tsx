import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/CustomButton";
import images from "@/constants/images";
import { Redirect, router } from "expo-router";
import { useUserStore } from "@/store/useUserStore";

const Home = () => {
  const userStore = useUserStore();

  if (userStore.user) return <Redirect href="/chats" />;

  return (
    <SafeAreaView className="bg-mirage-950 h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4 ">
          <Image source={images.logo} className="w-[130px] h-[84px]" resizeMode="contain" />

          <Text className="font-pmedium text-2xl text-gray-50 text-center mt-5">
            Connect easily with your family and friends over countries
          </Text>

          <CustomButton handlePress={() => router.push("/sign-up")} title="Start Messaging" containerStyles="w-full mt-7" />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#0f1828" style="light" />
    </SafeAreaView>
  );
};

export default Home;
