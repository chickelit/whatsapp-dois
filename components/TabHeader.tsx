import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { PropsWithChildren } from "react";
import icons from "@/constants/icons";
import { Href, router } from "expo-router";

type Props = {
  back?: Href<string | object>;
} & PropsWithChildren;

const TabHeader = (props: Props) => {
  return (
    <View className="px-3 h-[84px] border-b border-solid border-y-black-200 flex flex-row items-center space-x-2">
      {props.back && (
        <TouchableOpacity onPress={() => router.push(props.back!)}>
          <Image source={icons.leftArrow} />
        </TouchableOpacity>
      )}
      {props.children}
    </View>
  );
};

export default TabHeader;
