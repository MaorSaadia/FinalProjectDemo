import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
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
import { launchCameraAsync } from "expo-image-picker";
import * as ImagePickerFromGallery from "expo-image-picker";

import { Color } from "../constants/colors";
import { useStudents } from "../context/StudentContext";
import { useDarkMode } from "../context/DarkModeContext";
import PageContainer from "../components/PageContainer";
import Bubble from "../components/chats/Bubble";
import ReplyTo from "../components/chats/ReplyTo";
import getMessages from "../api/chats/getMessages";
import addMessages from "../api/chats/addMessages";
import updateChat from "../api/chats/updateChat";
import AwesomeAlert from "react-native-awesome-alerts";

function ChatScreen({ navigation, route }) {
  const { context } = useStudents();
  const { isDarkMode } = useDarkMode();
  const { image, title, ouid } = route.params;
  const socket = useRef();

  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [chatId, setChatId] = useState(route?.params?.chatId);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const [replyingTo, setReplyingTo] = useState();
  const [tempImageUri, setTempImageUri] = useState("");

  const senderId = context.id;

  async function pickedImageHandler() {
    const image = await ImagePickerFromGallery.launchImageLibraryAsync({
      mediaTypes: ImagePickerFromGallery.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!image.canceled) {
      setTempImageUri(image.assets[0].uri);
    }
  }

  async function takeImageHandler() {
    const image = await launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    if (!image.canceled) {
      setTempImageUri(image.assets[0].uri);
    }
  }

  const message = {
    senderId,
    messageText,
    chatId,
    replyingTo,
    tempImageUri,
  };

  useEffect(() => {
    const CustomHeader = () => (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <ImageBackground
          style={{ height: 40, width: 40 }}
          imageStyle={{
            borderRadius: 50,
            borderWidth: 0.5,
            borderColor: Color.gray,
          }}
          source={{
            uri: image,
          }}
        />
        <Text
          style={{
            marginHorizontal: 5,
            fontSize: 18,
          }}
        >
          {title}
        </Text>
      </View>
    );
    navigation.setOptions({
      headerTitle: () => <CustomHeader />,
    });
    moment.locale("he");
  }, []);

  useEffect(() => {
    socket.current = io("http://192.168.1.214:8800");
    socket.current.emit("new-user-add", senderId);
    return () => {
      socket.current.disconnect();
      // console.log("user disconnect");
    };
  }, [senderId]);

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

  const {
    mutate: handleAddMessages,
    isError,
    isPending,
  } = useMutation({
    mutationFn: (message) => addMessages(message),
    onSuccess: async (data) => {
      setSendMessage({ ...message, ouid });
      setReplyingTo(null);
      setMessageText("");
      await refetch();
      setTempImageUri("");
      setMessages([...messages, data]);
    },
    onError: (err) => console.log(err.message),
  });
  const { mutate: handleUpdateChat } = useMutation({
    mutationFn: ({ messageText: lastMessage, chatId }) =>
      updateChat({ messageText: lastMessage, chatId }),
    onError: (err) => console.log(err.message),
  });

  const handelSendMessage = useCallback(() => {
    handleUpdateChat({ messageText, chatId });
    handleAddMessages(message);
  }, [messageText, tempImageUri]);

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
                inverted={data?.length > 10 ? true : false}
                data={data?.length > 10 ? data && [...data].reverse() : data}
                renderItem={(itemData) => {
                  const message = itemData.item;
                  const isOwnMessage = message.senderId === context.id;
                  let time = moment(message.createdAt).fromNow();
                  const messageType = isOwnMessage
                    ? "myMessage"
                    : "theirMessage";
                  if (time.includes("בעוד")) {
                    time = time.replace("בעוד", "לפני");
                  }

                  return (
                    <Bubble
                      senderId={senderId}
                      title={title}
                      type={messageType}
                      text={message.messageText}
                      time={time}
                      setReply={() => setReplyingTo(message)}
                      replyingTo={message.replyingTo}
                      imageUrl={message?.image?.url}
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
              name={replyingTo.senderId === senderId ? "את/ה" : title}
              text={replyingTo.messageText}
              onCancel={() => setReplyingTo(null)}
            />
          )}
        </ImageBackground>

        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.mediaButton}
            onPress={pickedImageHandler}
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
              onPress={takeImageHandler}
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

          <AwesomeAlert
            show={tempImageUri !== ""}
            contentContainerStyle={
              isDarkMode
                ? { backgroundColor: Color.darkTheme }
                : { backgroundColor: Color.defaultTheme }
            }
            title="שלח תמונה"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            confirmText="שלח"
            cancelText="בטל"
            confirmButtonColor={Color.Blue700}
            cancelButtonColor={
              isDarkMode ? Color.darkTheme : Color.defaultTheme
            }
            cancelButtonTextStyle={{ color: Color.Blue500 }}
            titleStyle={styles.popupTitleStyle}
            onCancelPressed={() => setTempImageUri("")}
            onConfirmPressed={handelSendMessage}
            onDismiss={() => setTempImageUri("")}
            customView={
              <View>
                {tempImageUri !== "" && (
                  <Image
                    source={{ uri: tempImageUri }}
                    style={{ width: 250, height: 200, borderRadius: 10 }}
                  />
                )}
                {isPending && (
                  <ActivityIndicator
                    style={{ marginTop: 10 }}
                    color={Color.Blue400}
                  />
                )}
              </View>
            }
          />
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
  popupTitleStyle: {
    fontFamily: "varelaRound",
    letterSpacing: 0.3,
    color: Color.Blue700,
  },
});
