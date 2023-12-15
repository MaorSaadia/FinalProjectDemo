import { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import { io } from "socket.io-client";
import moment from "moment";
import "moment/locale/he";

import { Color } from "../constants/colors";
import { useStudents } from "../context/StudentContext";
import { useDarkMode } from "../context/DarkModeContext";
import PageContainer from "../components/PageContainer";
import Bubble from "../components/chats/Bubble";
import getMessages from "../api/chats/getMessages";
import addMessages from "../api/chats/addMessages";
import { Text } from "react-native-paper";
import ReplyTo from "../components/chats/ReplyTo";

function ChatScreen({ navigation, route }) {
  const { context } = useStudents();
  const { isDarkMode } = useDarkMode();
  const { title, ouid } = route.params;
  const socket = useRef();
  const flatList = useRef();

  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [chatId, setChatId] = useState(route?.params?.chatId);
  const [onlineUsers, setOnilneUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const [replyingTo, setReplyingTo] = useState();

  const senderId = context.id;

  const message = {
    senderId,
    messageText,
    chatId,
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
    moment.locale("he");
  }, []);

  useEffect(() => {
    socket.current = io("http://192.168.1.214:8800");
    socket.current.emit("new-user-add", senderId);
    socket.current.on("get-users", (users) => {
      setOnilneUsers(users);
    });
    return () => {
      socket.current.disconnect();
      // console.log("user disconnect");
    };
  }, [senderId]);

  // const isUserOnline = onlineUsers.some((user) => user.userId === ouid);

  useEffect(() => {
    // sending message to socket server
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    // recieve message from socket server
    socket.current.on("receive-message", (data) => {
      setReceiveMessage(data);
    });
  }, [sendMessage]);

  useEffect(() => {
    const refetchData = async () => {
      await refetch();
    };
    if (receiveMessage !== null && receiveMessage.chatId === chatId) {
      setMessages([...messages, receiveMessage]);
    }
    refetchData();
  }, [receiveMessage]);

  const { data, refetch } = useQuery({
    queryKey: ["messages", chatId],
    queryFn: () => getMessages(chatId),
  });

  const { mutate, isError } = useMutation({
    mutationFn: (message) => addMessages(message),
    onSuccess: async (data) => {
      setSendMessage({ ...message, ouid });
      await refetch();
      setMessages([...messages, data]);
      setMessageText("");
    },
    onError: (err) => console.log(err.message),
  });

  const handelSendMessage = useCallback(() => {
    mutate(message);
  }, [messageText]);

  const getBackgroundImage = (isDarkMode) => {
    return isDarkMode
      ? require("../../assets/images/ChatDarkBackground.jpg")
      : require("../../assets/images/ChatWhiteBackground.jpg");
  };

  return (
    <SafeAreaView edges={["right", "left", "bottom"]} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={100}
      >
        <ImageBackground
          source={getBackgroundImage(isDarkMode)}
          style={styles.backgroundImage}
        >
          <PageContainer style={{ backgroundColor: "transparent" }}>
            {!chatId && <Bubble text="שלח הודעה לתחילת שיחה" type="system" />}

            {chatId && (
              <FlatList
                ref={(ref) => (flatList.current = ref)}
                onContentSizeChange={() =>
                  flatList.current.scrollToEnd({ animated: false })
                }
                onLayout={() =>
                  flatList.current.scrollToEnd({ animated: false })
                }
                data={data}
                renderItem={(itemData) => {
                  const message = itemData.item;
                  const isOwnMessage = message.senderId === context.id;
                  const time = moment(message.createdAt).fromNow();
                  const messageType = isOwnMessage
                    ? "myMessage"
                    : "theirMessage";

                  return (
                    <Bubble
                      type={messageType}
                      text={message.messageText}
                      time={time}
                      setReply={() => setReplyingTo(message)}
                    />
                  );
                }}
              />
            )}
            {isError && (
              <Bubble text="שגיאה בשליחת ההודעה נסה שוב" type="error" />
            )}
          </PageContainer>

          {replyingTo && (
            <ReplyTo
              name={title}
              text={replyingTo.messageText}
              onCancel={() => setReplyingTo(null)}
            />
          )}
        </ImageBackground>

        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.mediaButton}
            onPress={() => console.log("Pressed!")}
          >
            <Ionicons name="add" size={24} color={Color.Blue500} />
          </TouchableOpacity>

          <TextInput
            autoCapitalize="none"
            style={
              isDarkMode
                ? { ...styles.textbox, color: Color.white }
                : { ...styles.textbox }
            }
            selectionColor={Color.Brown500}
            placeholder="הודעה"
            placeholderTextColor={
              isDarkMode ? Color.defaultTheme : Color.darkTheme
            }
            value={messageText}
            onChangeText={(text) => setMessageText(text)}
            onSubmitEditing={handelSendMessage}
          />

          {messageText === "" && (
            <TouchableOpacity
              style={styles.mediaButton}
              onPress={() => console.log("Pressed!")}
            >
              <Ionicons name="camera" size={24} color={Color.Blue500} />
            </TouchableOpacity>
          )}

          {messageText !== "" && (
            <TouchableOpacity
              style={styles.mediaButton}
              onPress={handelSendMessage}
            >
              <Ionicons name="send" size={24} color={Color.Blue500} />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
  },
  screen: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row-reverse",
    paddingVertical: 7,
    paddingHorizontal: 10,
    height: 55,
  },
  textbox: {
    flex: 1,
    fontSize: 16,
    fontFamily: "varelaRound",
    textAlign: "right",
    borderWidth: 1,
    borderRadius: 50,
    marginHorizontal: 5,
    paddingHorizontal: 15,
    borderColor: Color.Blue500,
  },
  mediaButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 35,
  },
});
