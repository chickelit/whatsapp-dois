import React from "react";
import { Tabs } from "expo-router";
import icons from "@/constants/icons";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

const TabIcon = ({ icon, focused, color, name }: { icon: ImageSourcePropType; focused: boolean; color: string; name: string }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image source={icon} resizeMode="contain" tintColor={color} className="w-6 h-6" />
      <Text className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`} style={{ color }}>
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="chats"
          options={{
            title: "Conversas",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => <TabIcon icon={icons.bookmark} focused={focused} color={color} name="Conversas" />,
          }}
        />
        <Tabs.Screen
          name="search/[query]"
          options={{
            title: "Encontrar",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => <TabIcon icon={icons.search} focused={focused} color={color} name="Encontrar" />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Minha conta",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => <TabIcon icon={icons.profile} focused={focused} color={color} name="Minha conta" />,
          }}
        />
      </Tabs>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default TabsLayout;
