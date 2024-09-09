import { View, Text, ScrollView, FlatList, TouchableOpacity, Image } from "react-native";
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

const Notifications = () => {
  const friendRequests = useFriendRequestStore((store) => store.friendRequests);
  const setFriendRequests = useFriendRequestStore((store) => store.setFriendRequests);
  const friends = useFriendStore((store) => store.friends);
  const setFriends = useFriendStore((store) => store.setFriends);
  const setIsLoading = useLoadingStore((store) => store.setIsLoading);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const data = await FriendRequestApi.index();
        console.log(JSON.stringify(friendRequests, null, 2));
        setFriendRequests(data.friendRequests);
      } catch (error) {
        console.log(error);
      }

      try {
        const data = await FriendApi.index();
        console.log(JSON.stringify(friendRequests, null, 2));
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
      <ScrollView horizontal>
        <FlatList
          contentContainerStyle={{ gap: 16 }}
          className="w-screen p-4"
          data={friends}
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
