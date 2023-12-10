import { ADDRESS } from "@env";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FlatList, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

import { Color } from "../constants/colors";
import { useStudents } from "../context/StudentContext";
import ErrorMessage from "../components/ui/ErrorMessage";
import Loader from "../components/ui/Loader";
import ChatList from "../components/Chats/ChatList";

function ChatListScreen({ navigation }) {
  const { context } = useStudents();

  const fetchChatsList = async () => {
    try {
      const response = await fetch(
        `https://finalprojectserver0-5.onrender.com/api/v1/chats/${context.id}`
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      return responseData;
    } catch (err) {
      throw new Error(err);
    }
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["chatList"],
    queryFn: fetchChatsList,
  });

  if (isLoading) {
    return <Loader color={Color.Brown500} />;
  }

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.chat}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => {
          const chatData = itemData.item;
          const chatId = chatData._id;

          const otherUserId = chatData.members.find(
            (uid) => uid !== context.id
          );

          return (
            <ChatList
              ouid={otherUserId}
              onPress={() => navigation.navigate("ChatScreen", { chatId })}
            />
          );
        }}
      />

      <Button
        style={{ marginTop: 10 }}
        buttonColor={Color.Brown500}
        textColor={Color.white}
        mode="elevated"
        onPress={() => navigation.navigate("ChatScreen")}
      >
        עבור לצאט
      </Button>
    </View>
  );
}

export default ChatListScreen;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});
