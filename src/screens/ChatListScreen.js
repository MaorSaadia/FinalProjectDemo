import { ADDRESS } from "@env";
import { useQuery } from "@tanstack/react-query";
import { FlatList, StyleSheet, View } from "react-native";

import { Color } from "../constants/colors";
import { useStudents } from "../context/StudentContext";
import ErrorMessage from "../components/ui/ErrorMessage";
import Loader from "../components/ui/Loader";
import ChatList from "../components/chats/ChatList";

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

          return (
            <ChatList
              ouid={otherUserId}
              chatId={chatId}
              // onPress={() => navigation.navigate("ChatScreen", { chatId })}
            />
          );
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
