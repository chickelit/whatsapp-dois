import React from "react";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="chats"
          options={{
            title: "Chats",
            headerShown: false,
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
