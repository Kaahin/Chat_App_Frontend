import * as React from "react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { io } from "socket.io-client";
// import config from "../config";

const BOT = {
  _id: 2,
  name: "GPT3",
  avatar: "https://placeimg.com/140/140/tech",
};

const USER = {
  _id: 1,
  name: "user",
  avatar: "https://placeimg.com/140/140/people",
};

// Inorder to connect the frontend with the backend i use
// tunneling to make it work. I do not know what causing it
// but it seems there's many complaining about same issues
// when they working with React Native.
// I use ngrok software for tunneling: https://ngrok.com/

const SERVER = "https://0a50-188-149-22-223.ngrok.io";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const socketRef = useRef();

  // io(SERVER).once("connect", () => {
  //   console.log("Frontend is connected with Backend");
  // });

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
  //       text: "My name is Ma'at and i'm your personal assistant",
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
      user={USER}
    />
  );
};

const styles = StyleSheet.create({});

export default Chat;
