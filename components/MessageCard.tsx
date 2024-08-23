import { Text, View } from "react-native";
import React, { PureComponent } from "react";
import { Message } from "@/models/Message";

type Props = {
  message: Message;
  isOwn: boolean;
  containerStyles?: string;
};

export class MessageCard extends PureComponent<Props> {
  render() {
    return (
      <View
        className={`py-1.5 px-4 bg-black-100 border-[1px] border-solid border-primary rounded-lg min-w-[160px] max-w-[80%] ${
          this.props.isOwn ? "self-end" : "self-start"
        } ${this.props.containerStyles}`}
      >
        <Text className="text-white text-base">{this.props.message.text}</Text>
      </View>
    );
  }
}

export default MessageCard;
