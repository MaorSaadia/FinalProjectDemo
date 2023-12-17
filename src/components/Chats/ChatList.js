import { useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import "moment/locale/he";

import { Color } from "../../constants/colors";
import ErrorMessage from "../ui/ErrorMessage";
import fetchChats from "../../api/chats/fetchChats";
import getMessages from "../../api/chats/getMessages";
import Loader from "../ui/Loader";

function ChatList({ ouid, chatId }) {
  const navigation = useNavigation();

  useEffect(() => {
    moment.locale("he");
  }, []);

  const { data, error } = useQuery({
    queryKey: ["chats", ouid],
    queryFn: () => fetchChats(ouid),
  });

  const { data: messages, isLoading } = useQuery({
    queryKey: ["messages", chatId],
    queryFn: () => getMessages(chatId),
  });

  const subTitle = messages[messages?.length - 1]?.messageText;
  const updatedAt = messages[messages?.length - 1]?.updatedAt;
  const time = moment(updatedAt).fromNow();

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  if (isLoading) {
    return <Loader color={Color.Brown500} />;
  }

  return (
    <TouchableNativeFeedback
      onPress={() =>
        navigation.navigate("ChatScreen", {
          chatId,
          ouid,
          title: data?.data?.name,
        })
      }
    >
      <View style={styles.container}>
        <ImageBackground
          style={{ height: 50, width: 50 }}
          imageStyle={{
            borderRadius: 50,
            borderWidth: 0.5,
            borderColor: Color.gray,
          }}
          source={{
            uri: data?.data?.avatar.url,
          }}
        />
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {data?.data?.name}
          </Text>

          <View style={styles.subTitle}>
            <Text numberOfLines={1} style={styles.lastMessage}>
              {subTitle ? subTitle : "צא'ט חדש"}
            </Text>

            <Text numberOfLines={1} style={styles.time}>
              {time}
            </Text>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    padding: 8,
  },
  textContainer: {
    marginLeft: 10,
  },
  title: {
    fontWeight: "600",
    fontSize: 17,
    letterSpacing: 0.3,
  },
  subTitle: {
    // flexDirection: "row",
  },
  lastMessage: {
    color: Color.gray,
    letterSpacing: 0.3,
  },
  time: {
    fontSize: 10,
    color: Color.Brown500,
  },
});

export default ChatList;
