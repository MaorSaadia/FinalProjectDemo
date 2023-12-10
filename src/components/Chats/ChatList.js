import {
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Avatar, Text } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";

import { useDarkMode } from "../../context/DarkModeContext";
import { Color } from "../../constants/colors";
import { fetchChats } from "../../api/fetchChats";
import ErrorMessage from "../ui/ErrorMessage";

function ChatList({ onPress, ouid }) {
  const { isDarkMode } = useDarkMode();

  const { data, error } = useQuery({
    queryKey: ["chats", ouid],
    queryFn: () => fetchChats(ouid),
  });

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.container}>
        <Avatar.Image
          style={{
            backgroundColor: isDarkMode ? Color.darkTheme : Color.defaultTheme,
          }}
          source={{
            uri: data?.data?.avatar.url,
          }}
          size={50}
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
    paddingVertical: 9,
    // borderBottomWidth: 1,
    // borderBottomColor: Color.Blue100,
    minHeight: 50,
  },
  textContainer: {
    marginLeft: 14,
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
