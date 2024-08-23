import { View, TextInputProps, TextInput, TouchableOpacity, Image, TouchableOpacityProps } from "react-native";
import React from "react";
import icons from "@/constants/icons";

interface IProps extends TextInputProps {
  value: string;
  handleChange: (v: string) => void;
  handlePress: TouchableOpacityProps["onPress"];
  otherStyles?: string;
}

const MessageInput = ({ handleChange, value, placeholder, otherStyles, handlePress, ...props }: IProps) => {
  return (
    <View
      className={`border-2 border-black-200 rounded-2xl px-4 bg-black-100 focus:border-secondary items-center flex-row space-x-4 ${otherStyles}`}
    >
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChange}
        {...props}
      />

      <TouchableOpacity onPress={handlePress}>
        <Image source={icons.rightArrow} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default MessageInput;
