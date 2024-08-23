import { View, TextInputProps, TextInput } from "react-native";
import React, { PropsWithChildren, ReactChildren } from "react";

interface IProps {
  value: string;
  placeholder?: string;
  handleChange: (v: string) => void;
  otherStyles?: string;
  after?: React.ReactNode;
}

const CustomTextInput = ({ handleChange, value, placeholder, otherStyles, after, ...props }: IProps & TextInputProps) => {
  return (
    <View className={`w-full h-16 flex flex-row items-center ${otherStyles}`}>
      <View className={`flex-grow border-2 border-black-200 rounded-2xl px-4 bg-black-100 focus:border-secondary `}>
        <TextInput
          className="text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChange}
          {...props}
        />
      </View>
      {after}
    </View>
  );
};

export default CustomTextInput;
