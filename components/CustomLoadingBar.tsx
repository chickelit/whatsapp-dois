import { View, Text, ProgressBarAndroid } from "react-native";
import React from "react";
import { useLoadingStore } from "@/store/useLoadingStore";
import { ProgressBar } from "react-native-paper";

const CustomLoadingBar = () => {
  const isLoading = useLoadingStore((store) => store.isLoading);

  return (
    <View className="absolute top-0">
      <ProgressBar
        indeterminate
        color="#ff9c01"
        visible={isLoading}
        className="w-screen bg-[#ff9c0150]"
        theme={{
          isV3: true,
        }}
      />
    </View>
  );
};

export default CustomLoadingBar;
