import { View, Text, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import React from "react";
import { Chat } from "@/models/Chat";
import images from "@/constants/images";
import { router } from "expo-router";
import { useChatStore } from "@/store/useChatStore";
import dayjs from "dayjs";
import Avatar from "./Avatar";

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
      className={`flex-row space-x-2`}
    >
      <Avatar source={{ uri: chat.participants[0].avatar }} />
      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-psemibold text-white">{chat.participants[0].username}</Text>
          <Text className="text-sm font-psemibold text-gray-400">{parsedDate}</Text>
        </View>
        <Text className="text-base font-pmedium text-gray-400" numberOfLines={1}>
          {chat.latestMessage?.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;
