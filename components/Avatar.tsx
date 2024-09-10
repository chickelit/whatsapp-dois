import { View, Image, ImageSourcePropType } from "react-native";
import React from "react";
import images from "@/constants/images";

const Avatar = ({
  source,
  borderColor,
  containerStyles,
  size = "base",
}: {
  source?: ImageSourcePropType | undefined;
  borderColor?: string;
  containerStyles?: string;
  size?: "sm" | "md" | "base" | "lg";
}) => {
  const sizeInPx = {
    sm: 24,
    md: 36,
    base: 48,
    lg: 60,
  };

  return (
    <View className={`rounded-full ${containerStyles} ${borderColor ? `border-2 border-solid ${borderColor} p-[3px]` : ""}`}>
      <Image
        source={(source as any).uri ? source : images.profile}
        style={{ width: sizeInPx[size], height: sizeInPx[size] }}
        className="rounded-full"
        resizeMode="contain"
      />
    </View>
  );
};

export default Avatar;
