import { Image, ScrollView, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChatApi } from "@/api/ChatApi";
import ChatCard from "@/components/ChatCard";
import { useChatStore } from "@/store/useChatStore";
import images from "@/constants/images";

const Chats = () => {
  const chats = useChatStore((state) => state.chats);
  const setChats = useChatStore((state) => state.setChats);

  useEffect(() => {
    {
      (async () => {
        try {
          const { chats } = await ChatApi.index();

          setChats(chats);
        } catch (error: any) {
          console.log(JSON.stringify(error.response?.data, null, 2));
        }
      })();
    }
  }, []);

  return (
    <SafeAreaView className="h-screen w-screen bg-primary">
      <View className="px-4 border-b border-solid border-y-black-200">
        <Image source={images.logo} className="w-[130px] h-[84px]" resizeMode="contain" />
      </View>
      <ScrollView>
        <View className="h-screen w-screen p-4 items-center">
          {chats.map((chat) => (
            <ChatCard key={chat.id + Math.random()} chat={chat} otherStyles="border-[1px] border-transparent mb-6" />
          ))}
          <Text className="text-sm text-gray-500">Não tem mais conversas.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chats;
