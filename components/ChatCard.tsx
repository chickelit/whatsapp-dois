import { View, Text, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import React from "react";
import { Chat } from "@/models/Chat";
import images from "@/constants/images";
import { router } from "expo-router";
import { useChatStore } from "@/store/useChatStore";
import dayjs from "dayjs";

interface IProps {
  otherStyles?: string;
  chat: Chat;
}

const ChatCard = ({ otherStyles, chat }: IProps) => {
  const chatStore = useChatStore();
  const today = new Date();
  const yesterday = new Date();

  yesterday.setDate(yesterday.getDate() - 1);

  const lastMessageAt = chat.latestMessage && dayjs(chat.latestMessage.createdAt);
  const isToday = lastMessageAt && lastMessageAt.isSame(today, "day");
  const isYesterday = lastMessageAt && lastMessageAt.isSame(yesterday, "day");
  const parsedDate = isToday ? lastMessageAt!.format("HH:mm") : isYesterday ? "Ontem" : lastMessageAt!.format("DD/MM/YYYY");

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        chatStore.setChat(chat);
        router.push("/chat");
      }}
      className={`w-full flex flex-row space-x-3 items-center cursor-pointer ${otherStyles}`}
    >
      <View className="rounded-full border-[2px] border-solid border-secondary p-[3px]">
        <Image source={images.profile} className="w-12 h-12 rounded-full" resizeMode="contain" />
      </View>
      <View className="max-w-full flex-grow">
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-psemibold text-white">{chat.participants[0].username}</Text>
          <Text className="text-sm font-psemibold text-gray-400">{parsedDate}</Text>
        </View>
        <Text
          className="text-base font-pmedium text-gray-400 max-w-[87%] border-1 border-solid border-red-700"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {chat.latestMessage?.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;
