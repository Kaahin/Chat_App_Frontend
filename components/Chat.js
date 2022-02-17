import * as React from "react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { io } from "socket.io-client";

const BOT = {
  _id: 2,
  name: "Abdi",
  avatar: "https://placeimg.com/140/140/tech",
};

const USER = {
  _id: 1,
  name: "Abdi",
  avatar: "https://placeimg.com/140/140/people",
};
const SERVER = "http://49d1-188-149-22-223.ngrok.io";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const socketRef = useRef();
  // const [quickReply, setQuickReply] = useState([]);

  console.log(SERVER);

  io(SERVER).once("connect", () => {
    console.log("Frontend is connected with Backend");
  });

  useLayoutEffect(() => {
    socketRef.current = io(SERVER);
    socketRef.current.on("reply", (message) => {
      // message recieved from server and set in the state
      setMessages((prevMessages) => GiftedChat.append(prevMessages, message));
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [messages]);

  const onSend = useCallback(async (messages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, messages));
    const { _id, createdAt, text, user } = messages[0];
    // chat sent to the server
    socketRef.current.emit("request", { _id, createdAt, text, user });
  }, []);

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 2,
  //       createdAt: new Date(),
  //       text: "My name is Maslo and i'm your personal assistant",
  //       user: BOT,
  //     },
  //     {
  //       _id: 1,
  //       createdAt: new Date(),
  //       text: "Hi",
  //       user: BOT,
  //     },
  //   ]);
  // }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(message) => onSend(message)}
      user={{ _id: 1 }}
    />
  );
};

const styles = StyleSheet.create({});

export default Chat;
