import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Color } from "../constants/colors";
import { useDarkMode } from "../context/DarkModeContext";
import ChatListScreen from "../screens/ChatListScreen";
import ChatScreen from "../screens/ChatScreen";

const ChatStack = createNativeStackNavigator();

function ChatStackScreen({ navigation }) {
  const { isDarkMode } = useDarkMode();
  return (
    <ChatStack.Navigator
      initialRouteName="ChatListScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? Color.Brown700 : Color.Brown100,
        },
        drawerContentStyle: {
          backgroundColor: isDarkMode ? Color.darkTheme : Color.defaultTheme,
        },
        headerTitle: "",
        drawerActiveTintColor: !isDarkMode
          ? Color.darkTheme
          : Color.defaultTheme,
        drawerInactiveTintColor: !isDarkMode
          ? Color.darkTheme
          : Color.defaultTheme,
        drawerActiveBackgroundColor: Color.Brown400,
        drawerLabelStyle: {
          marginLeft: -20,
          fontSize: 15,
        },
      }}
    >
      <ChatStack.Screen
        name="ChatListScreen"
        component={ChatListScreen}
        options={{
          title: "",
          headerRight: () => (
            <View style={{ marginLeft: -10 }}>
              <Ionicons.Button
                name="ios-menu"
                size={25}
                color={Color.darkTheme}
                backgroundColor={isDarkMode ? Color.Brown700 : Color.Brown100}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
        }}
      />
      <ChatStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          title: "ChatScreen",
          headerRight: () => (
            <View style={{ marginLeft: -10 }}>
              <Ionicons.Button
                name="arrow-forward"
                size={24}
                color={Color.darkTheme}
                backgroundColor={isDarkMode ? Color.Brown700 : Color.Brown100}
                onPress={() => navigation.navigate("ChatListScreen")}
              />
            </View>
          ),
          headerTintColor: Color.darkTheme,
          headerTitle: "שם",
          headerTitleAlign: "center",
          headerBackVisible: false,
        }}
      />
    </ChatStack.Navigator>
  );
}

export default ChatStackScreen;
