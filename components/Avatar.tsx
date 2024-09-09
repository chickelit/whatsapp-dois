import { View, Image, ImageSourcePropType } from "react-native";
import React from "react";
import images from "@/constants/images";

const Avatar = ({
  source,
  borderColor,
  containerStyles,
}: {
  source?: ImageSourcePropType | undefined;
  borderColor?: string;
  containerStyles?: string;
}) => {
  return (
    <View className={`rounded-full ${containerStyles} ${borderColor ? `border-2 border-solid ${borderColor} p-[3px]` : ""}`}>
      <Image
        source={(source as any).uri ? source : images.profile}
        style={{ width: 48, height: 48 }}
        className="w-12 h-12 rounded-full"
        resizeMode="contain"
      />
    </View>
  );
};

export default Avatar;
