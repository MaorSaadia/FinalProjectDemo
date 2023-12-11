import {
  ImageBackground,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";

import { Color } from "../../constants/colors";
import ErrorMessage from "../ui/ErrorMessage";
import fetchChats from "../../api/chats/fetchChats";

function ChatList({ onPress, ouid, chatId }) {
  const navigation = useNavigation();

  const { data, error } = useQuery({
    queryKey: ["chats", ouid],
    queryFn: () => fetchChats(ouid),
  });

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return (
    <TouchableNativeFeedback
      onPress={() =>
        navigation.navigate("ChatScreen", { chatId, title: data?.data?.name })
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

          <Text numberOfLines={1} style={styles.subTitle}>
            {data?.data?._id}
          </Text>
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
    color: Color.gray,
    letterSpacing: 0.3,
  },
});

export default ChatList;
