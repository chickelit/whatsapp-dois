import { View, Text, TextInputProps, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import icons from "@/constants/icons";

interface IProps extends TextInputProps {
  title: string;
  value: string;
  handleChange: (v: string) => void;
  otherStyles?: string;
  isSecure?: boolean;
  error?: string;
}

const FormField = ({ handleChange, title, value, placeholder, otherStyles, isSecure, error, ...props }: IProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

	return (
    <View className={`grid gap-1 ${otherStyles}`}>
      <Text className="text-base text-gray-50 font-pmedium">{title}</Text>
      <View className="border-2 border-black-200 rounded-2xl w-full h-16 px-4 bg-black-100 focus:border-secondary items-center flex-row">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChange}
          secureTextEntry={isSecure && !showPassword}
          {...props}
        />

        {isSecure && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eyeHide : icons.eye} className="w-6 h-6" resizeMode="contain" />
          </TouchableOpacity>
        )}
      </View>

      {error ? <Text className="text-xs text-red-500 font-plight font-psemibold absolute bottom-[-20px]">{error}</Text> : ""}
    </View>
  );
};

export default FormField;
