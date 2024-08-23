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

const Chat = () => {
  const chatStore = useChatStore();
  const user = useUserStore((state) => state.user);
  const messages = useMessageStore((state) => state.messages);
  const setMessages = useMessageStore((state) => state.setMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const scrollRef = useRef<ScrollView>(null);

  if (!chatStore.chat) return <Redirect href="/chats" />;

  const submit = async () => {
    try {
      const data = await MessageApi.store({
        chatId: chatStore.chat!.id,
        message: {
          text: content,
        },
      });
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  };

  useEffect(() => {
    {
      (async () => {
        try {
          setIsLoading(true);

          const { messages } = await MessageApi.index(chatStore.chat!.id, { page: 1, perPage: 50 });

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
      <SafeAreaView className="h-full">
        <View className="px-3 flex-grow-0 h-[84px] border-b border-solid border-y-black-200 flex flex-row items-center space-x-2">
          <TouchableOpacity onPress={() => router.push("/chats")}>
            <Image source={icons.leftArrow} />
          </TouchableOpacity>
          <View className="flex flex-row items-center space-x-2">
            <View className="rounded-full border-[2px] border-solid border-secondary p-[3px] flex flex-row">
              <Image source={images.profile} className="w-12 h-12 rounded-full" resizeMode="contain" />
            </View>
            <View>
              <Text className="text-white text-base font-psemibold">{chatStore.chat!.participants[0].username}</Text>
              {/* TODO: This status is not a real information :) */}
              <Text className="text-sm text-gray-100 font-medium">Online</Text>
            </View>
          </View>
        </View>

        {isLoading ? (
          <View>
            <Text>CARREGANDO</Text>
          </View>
        ) : (
          <ScrollView
            ref={scrollRef}
            onContentSizeChange={(w, h) => {
              console.log(w, h);
              scrollRef.current?.setNativeProps({

							});
            }}
						className="scale-y-[-1]"
          >
            {messages?.map((message) => (
              <MessageCard containerStyles="my-0.5 mx-1 scale-y-[-1]" key={message.id} message={message} isOwn={message.fromId === user!.id} />
            ))}
          </ScrollView>
        )}

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
