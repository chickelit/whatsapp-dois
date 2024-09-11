import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  VirtualizedList,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useChatStore } from "@/store/useChatStore";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import { Redirect, router } from "expo-router";
import images from "@/constants/images";
import MessageInput from "@/components/MessageInput";
import { MessageApi } from "@/api/MessageApi";
import { StatusBar } from "expo-status-bar";
import { useMessageStore } from "@/store/useMessageStore";
import MessageCard from "@/components/MessageCard";
import { Message } from "@/models/Message";
import { useUserStore } from "@/store/useUserStore";
import TabHeader from "@/components/TabHeader";
import { useLoadingStore } from "@/store/useLoadingStore";
import CustomLoadingBar from "@/components/CustomLoadingBar";
import Avatar from "@/components/Avatar";

const Chat = () => {
  const chatStore = useChatStore();
  const chat = useChatStore((s) => s.chat);
  const setChat = useChatStore((s) => s.setChat);
  const user = useUserStore((state) => state.user);
  const messages = useMessageStore((state) => state.messages);
  const setMessages = useMessageStore((state) => state.setMessages);
  const setIsLoading = useLoadingStore((store) => store.setIsLoading);
  const [content, setContent] = useState("");
  const scrollRef = useRef<ScrollView>(null);

  if (!chat) return <Redirect href="/chats" />;

  const submit = async () => {
    if (!content) return;

    try {
      const data = await MessageApi.store({
        chatId: chat?.id,
        userId: chat?.participants[0].id,
        message: {
          text: content,
        },
      });

			console.log("HELLO, IM API RESPONSE")
			console.log(data.chat)

      setChat(data.chat);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    } finally {
      setContent("");
    }
  };

  useEffect(() => {
    {
      (async () => {
        if (!chat.id) return;

        try {
          setIsLoading(true);

          const { messages } = await MessageApi.index(chat.id, { page: 1, perPage: 50 });

          setMessages(messages);
        } catch (error) {
          console.log(error);

          router.push("/chats");
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, []);

  return (
    <KeyboardAvoidingView className="w-screen h-screen bg-primary flex flex-col" behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <SafeAreaView className="h-full flex">
        <TabHeader back="/chats">
          <CustomLoadingBar />
          <View className="flex flex-row items-center space-x-2">
            <Avatar source={{ uri: chat.display?.image }} />
            <View>
              <Text className="text-white text-base font-psemibold">{chat.display?.title}</Text>
              {/* TODO: This status is not a real information :) */}
              <Text className="text-sm text-gray-100 font-medium">Online</Text>
            </View>
          </View>
        </TabHeader>

        <ScrollView ref={scrollRef} contentContainerStyle={{ alignItems: "flex-end" }} className="scale-y-[-1]">
          {messages?.map((message) => (
            <MessageCard
              containerStyles="my-0.5 mx-1 scale-y-[-1]"
              key={message.id}
              message={message}
              isOwn={message.fromId === user!.id}
            />
          ))}
        </ScrollView>

        <View className="p-2 flex-grow-0 h-[60px] max-h-[140px] flex flex-row items-center">
          <MessageInput
            otherStyles="min-h-16"
            value={content}
            placeholder="Escreva uma mensagem..."
            handleChange={(v) => setContent(v)}
            handlePress={submit}
            multiline
            numberOfLines={4}
            scrollEnabled
          />
        </View>

        <StatusBar backgroundColor="#0f1828" style="light" />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Chat;
