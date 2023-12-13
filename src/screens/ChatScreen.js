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

import { Color } from "../constants/colors";
import { useStudents } from "../context/StudentContext";
import { useDarkMode } from "../context/DarkModeContext";
import PageContainer from "../components/PageContainer";
import Bubble from "../components/chats/Bubble";
import getMessages from "../api/chats/getMessages";
import addMessages from "../api/chats/addMessages";

function ChatScreen({ navigation, route }) {
  const { context } = useStudents();
  const { isDarkMode } = useDarkMode();
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [chatId, setChatId] = useState(route?.params?.chatId);

  const { title, ouid, setSendMessage, receiveMessage } = route.params;

  const senderId = context.id;

  const { mutate } = useMutation({
    mutationFn: ({ senderId, messageText, chatId }) =>
      addMessages({ senderId, messageText, chatId }),
    onSuccess: (data) => {
      setMessages([...messages, data]);
      setMessageText("");
    },
    onError: () => console.log("error"),
  });

  const handelSendMessage = useCallback(() => {
    mutate({ senderId, messageText, chatId });
  }, [messageText]);

  const { data } = useQuery({
    queryKey: ["messages", chatId],
    queryFn: () => getMessages(chatId),
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
  }, []);

  useEffect(() => {
    console.log("Message Arrived: ", receiveMessage);
    if (receiveMessage !== null && receiveMessage.chatId === chatId) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);

  // send message to socket server
  setSendMessage({ ...messages, ouid });

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
                data={data}
                renderItem={(itemData) => {
                  const message = itemData.item;
                  const isOwnMessage = message.senderId === context.id;
                  const messageType = isOwnMessage
                    ? "myMessage"
                    : "theirMessage";

                  return (
                    <Bubble type={messageType} text={message.messageText} />
                  );
                }}
              />
            )}
          </PageContainer>
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
