import { FlatList, StyleSheet, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { FontAwesome5 } from "@expo/vector-icons";

import { Color } from "../constants/colors";
import { useStudents } from "../context/StudentContext";
import ErrorMessage from "../components/ui/ErrorMessage";
import Loader from "../components/ui/Loader";
import ChatList from "../components/chats/ChatList";
import fetchChatsList from "../api/chats/fetchChatsList";
import { Text } from "react-native-paper";

function ChatListScreen() {
  const { context } = useStudents();

  const { data, error, isLoading } = useQuery({
    queryKey: ["chatList", context.id],
    queryFn: () => fetchChatsList(context.id),
  });

  if (isLoading) {
    return <Loader color={Color.Brown500} />;
  }

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  if (data.results == 0) {
    return (
      <View style={styles.container}>
        <FontAwesome5
          name="users"
          size={60}
          color={Color.Brown400}
          style={styles.noResultsIcon}
        />
        <Text style={styles.noResultsText}>עדיין אין צאטי'ם</Text>
      </View>
    );
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultsIcon: {
    marginBottom: 10,
  },
  noResultsText: {
    color: Color.Brown500,
    fontFamily: "varelaRound",
    fontSize: 15,
    letterSpacing: 0.3,
  },
  line: {
    margin: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Color.Blue400,
  },
});
