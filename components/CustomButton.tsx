import { Text, TouchableOpacity } from "react-native";
import React, { PropsWithChildren } from "react";

type IProps = {
  title?: string;
  handlePress: () => any;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
};

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading, children }: IProps & PropsWithChildren) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""}`}
      disabled={isLoading}
    >
      {children ? children : <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>}
    </TouchableOpacity>
  );
};

export default CustomButton;
