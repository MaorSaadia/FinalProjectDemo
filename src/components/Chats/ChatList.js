import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { Avatar } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";

import { useDarkMode } from "../../context/DarkModeContext";
import { Color } from "../../constants/colors";
import ErrorMessage from "../ui/ErrorMessage";
import Loader from "../ui/Loader";

function ChatList({ onPress, ouid }) {
  const { isDarkMode } = useDarkMode();
  // console.log("ouid:", ouid);

  const fetchChats = async () => {
    try {
      const response = await fetch(
        `https://finalprojectserver0-5.onrender.com/api/v1/students/${ouid}`
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
    queryKey: ["chats"],
    queryFn: fetchChats,
  });

  // if (isLoading) {
  //   return <Loader color={Color.Brown500} />;
  // }

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Avatar.Image
          style={{
            backgroundColor: isDarkMode ? Color.darkTheme : Color.defaultTheme,
          }}
          source={{
            uri: data?.data?.avatar.url,
          }}
          size={40}
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
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: Color.Blue100,
    minHeight: 50,
  },
  textContainer: {
    marginLeft: 14,
  },
  title: {
    fontFamily: "medium",
    fontSize: 16,
    letterSpacing: 0.3,
  },
  subTitle: {
    fontFamily: "regular",
    color: Color.Blue600,
    letterSpacing: 0.3,
  },
});

export default ChatList;
