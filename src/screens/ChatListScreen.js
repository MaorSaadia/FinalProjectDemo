import { FlatList, StyleSheet, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

import { Color } from "../constants/colors";
import { useStudents } from "../context/StudentContext";
import ErrorMessage from "../components/ui/ErrorMessage";
import Loader from "../components/ui/Loader";
import ChatList from "../components/chats/ChatList";
import fetchChatsList from "../api/chats/fetchChatsList";

function ChatListScreen() {
  const { context } = useStudents();
  const [onlineUsers, setOnilneUsers] = useState([]);
  // const [sendMessage, setSendMessage] = useState(null);
  // const [receiveMessage, setReceiveMessage] = useState(null);
  const socket = useRef();

  const { data, error, isLoading } = useQuery({
    queryKey: ["chatList", context.id],
    queryFn: () => fetchChatsList(context.id),
  });

  // useEffect(() => {
  //   socket.current = io("http://192.168.1.214:8800");
  //   socket.current.emit("new-user-add", context.id);
  //   socket.current.on("get-users", (users) => {
  //     setOnilneUsers(users);
  //   });
  // }, [data]);

  // sending message to socket server
  // useEffect(() => {
  //   if (sendMessage !== null) {
  //     socket.current.emit("send-message", sendMessage);
  //   }
  // }, [sendMessage]);

  // // receive message from socket server
  // useEffect(() => {
  //   socket.current.on("receive-message", (data) => {
  //     setReceiveMessage(data);
  //   });
  // }, []);

  if (isLoading) {
    return <Loader color={Color.Brown500} />;
  }

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return (
    <View>
      <FlatList
        data={data?.chat}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => {
          const chatData = itemData.item;
          const chatId = chatData._id;

          const otherUserId = chatData.members.find(
            (uid) => uid !== context.id
          );

          return <ChatList ouid={otherUserId} chatId={chatId} />;
        }}
      />
      <View style={styles.line}></View>
    </View>
  );
}

export default ChatListScreen;

const styles = StyleSheet.create({
  line: {
    margin: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Color.Blue400,
  },
});
