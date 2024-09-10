import { FlatList, Image, ScrollView, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChatApi } from "@/api/ChatApi";
import ChatCard from "@/components/ChatCard";
import { useChatStore } from "@/store/useChatStore";
import images from "@/constants/images";
import TabHeader from "@/components/TabHeader";
import CustomLoadingBar from "@/components/CustomLoadingBar";
import { useLoadingStore } from "@/store/useLoadingStore";

const Chats = () => {
  const chats = useChatStore((state) => state.chats);
  const setChats = useChatStore((state) => state.setChats);
  const setIsLoading = useLoadingStore((store) => store.setIsLoading);

  useEffect(() => {
    if (chats.length) return;

    {
      (async () => {
        setIsLoading(true);

        try {
          const { chats } = await ChatApi.index();

          setChats(chats);
        } catch (error: any) {
          console.log(JSON.stringify(error.response?.data, null, 2));
        }

        setIsLoading(false);
      })();
    }
  }, []);

  return (
    <SafeAreaView className="h-screen w-screen bg-primary">
      <TabHeader>
        <CustomLoadingBar />
        <Text className="h-min text-2xl font-psemibold text-white">Conversas</Text>
      </TabHeader>
      <ScrollView horizontal>
        <View className="w-screen h-screen p-4 items-center">
          <FlatList
            contentContainerStyle={{ gap: 16 }}
            className="w-full"
            data={chats}
            ListFooterComponent={<Text className="text-center text-sm text-gray-500">Não tem mais conversas.</Text>}
            renderItem={({ item }) => <ChatCard chat={item} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chats;
