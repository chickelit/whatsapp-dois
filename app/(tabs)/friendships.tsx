import { View, Text, ScrollView, FlatList, TouchableOpacity, TouchableHighlight, Image, TouchableWithoutFeedback } from "react-native";
import React, { useEffect } from "react";
import TabHeader from "@/components/TabHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFriendRequestStore } from "@/store/useFriendRequestStore";
import { FriendRequestApi } from "@/api/FriendRequestApi";
import Avatar from "@/components/Avatar";
import CustomLoadingBar from "../../components/CustomLoadingBar";
import { FriendApi } from "@/api/FriendApi";
import { useFriendStore } from "@/store/useFriendStore";
import { useLoadingStore } from "@/store/useLoadingStore";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { router } from "expo-router";

const Notifications = () => {
  const friendRequests = useFriendRequestStore((store) => store.friendRequests);
  const setFriendRequests = useFriendRequestStore((store) => store.setFriendRequests);
  const setCount = useFriendRequestStore((store) => store.setCount);
  const count = useFriendRequestStore((store) => store.count);
  const friends = useFriendStore((store) => store.friends);
  const setFriends = useFriendStore((store) => store.setFriends);
  const setIsLoading = useLoadingStore((store) => store.setIsLoading);

  useEffect(() => {
    if (friendRequests.length) return;

    (async () => {
      setIsLoading(true);

      try {
        const data = await FriendRequestApi.index();
        console.log(JSON.stringify(friendRequests, null, 2));
        setFriendRequests(data.friendRequests);
        setCount(data.count);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (friends.length) return;

    (async () => {
      setIsLoading(true);

      try {
        const data = await FriendApi.index();
        console.log(JSON.stringify(friends, null, 2));
        setFriends(data.friends);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    })();
  }, []);

  return (
    <SafeAreaView className="h-screen w-screen bg-primary relative">
      <TabHeader>
        <CustomLoadingBar />
        <Text className="h-min text-2xl font-psemibold text-white">Amizades</Text>
      </TabHeader>
      {count && count > 0 ? (
        <TouchableOpacity
          className="p-4 flex-row items-center space-x-2 border-b-[1px] border-black-200"
          onPress={() => router.push("/friend-requests")}
        >
          <View className="h-12 w-12 relative flex">
            <Avatar source={{ uri: friendRequests[0]?.from.avatar }} />
            <View className="absolute right-[-2px] top-[-2px] w-6 h-6 rounded-full bg-[#ee2cee] flex justify-center items-center">
              <Text className="text-white text-[12px] font-psemibold" numberOfLines={1}>
                {count}
              </Text>
            </View>
          </View>
          <View>
            <Text className="text-white font-psemibold">Pedidos de amizade</Text>
            <Text className="text-gray-300">Aceitar ou rejeitar pedidos de amizade</Text>
          </View>
        </TouchableOpacity>
      ) : undefined}
      <ScrollView horizontal>
        <FlatList
          contentContainerStyle={{ gap: 16 }}
          className="w-screen p-4"
          data={friends}
          ListFooterComponent={<Text className="text-center text-sm text-gray-500">Não tem mais amigos.</Text>}
          renderItem={({ item }) => (
            <View className="w-full flex flex-row items-center justify-between space-x-2">
              <View className="flex flex-row space-x-2 items-center">
                <Avatar source={{ uri: item.avatar }} />
                <Text className="text-lg text-gray-50 font-psemibold">{item.username}</Text>
              </View>
              <View className="flex flex-row items-center space-x-2">
                <TouchableOpacity className="bg-[#ffffff10] bg-opacity-[0.5] px-4 py-1 rounded">
                  <Text className="text-white font-pmedium text-sm">Mensagem</Text>
                </TouchableOpacity>
                <TouchableOpacity className="">
                  <Image source={icons.menu} resizeMode="contain" className="w-5 h-5" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;
