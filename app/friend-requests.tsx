import { View, Text, FlatList, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TabHeader from "@/components/TabHeader";
import { useFriendRequestStore } from "../store/useFriendRequestStore";
import icons from "@/constants/icons";
import Avatar from "@/components/Avatar";

const FriendRequests = () => {
  const friendRequests = useFriendRequestStore((store) => store.friendRequests);

  return (
    <SafeAreaView className="w-screen h-screen bg-primary">
      <TabHeader back={"/(tabs)/friendships"}>
        <Text className="h-min text-2xl font-psemibold text-white">Pedidos de amizade</Text>
      </TabHeader>
      <ScrollView horizontal>
        <FlatList
          contentContainerStyle={{ gap: 16 }}
          className="w-screen p-4"
          data={friendRequests}
          renderItem={({ item }) => (
            <View className="w-full flex flex-row items-center justify-between space-x-2">
              <View className="flex flex-row space-x-2 items-center">
                <Avatar source={{ uri: item?.from.avatar }} />
                <Text className="text-lg text-gray-50 font-psemibold">{item?.from.username}</Text>
              </View>
              <View className="flex flex-row items-center space-x-3">
                <TouchableOpacity className="bg-[#0f6dd8] px-4 py-1 rounded">
                  <Text className="text-white font-pmedium text-sm">Aceitar</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={icons.cross} resizeMode="contain" className="w-3 h-3" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FriendRequests;
