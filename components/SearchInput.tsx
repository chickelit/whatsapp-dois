import { View, TextInputProps, TextInput, TouchableOpacity, Image } from "react-native";
import React from "react";
import icons from "@/constants/icons";

interface IProps extends TextInputProps {
  value: string;
  handleChange: (v: string) => void;
  otherStyles?: string;
}

const SearchInput = ({ handleChange, value, placeholder, otherStyles, ...props }: IProps) => {
  return (
    <View
      className={`border-2 border-black-200 rounded-2xl w-full h-16 px-4 bg-black-100 focus:border-secondary items-center flex-row space-x-4 ${otherStyles}`}
    >
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChange}
        {...props}
      />

      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
