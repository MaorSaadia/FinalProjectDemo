import { useContext } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";

import { name as app_name, version as app_version } from "../../package.json";
import { Color } from "../constants/colors";
import { StudentContext, useStudents } from "../context/StudentContext";
import { useDarkMode } from "../context/DarkModeContext";
import DarkModeSwitch from "./ui/DarkModeSwitch";

async function logoutHandler(auth, navigation) {
  try {
    await AsyncStorage.removeItem("token");
    auth.logout();
    navigation.goBack();
    navigation.navigate("HomeStackScreen");
    navigation.navigate("WelcomeScreen");
  } catch (err) {
    console.log(err);
  }
}

function CustomDrawer(props) {
  const auth = useContext(StudentContext);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const { context } = useStudents();
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        style={{
          backgroundColor: isDarkMode ? Color.darkTheme : Color.defaultTheme,
        }}
        {...props}
        contentContainerStyle={{
          backgroundColor: isDarkMode ? Color.Blue800 : Color.Blue200,
        }}
      >
        <View
          style={{
            paddingBottom: 15,
            paddingHorizontal: 15,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: isDarkMode ? Color.Blue800 : Color.Blue200,
          }}
        >
          <ImageBackground
            style={{ height: 50, width: 50 }}
            imageStyle={{
              borderRadius: 50,
              borderWidth: 0.5,
              borderColor: Color.gray,
            }}
            source={{
              uri: context.avatar.url,
            }}
          />
          <Text
            style={{
              color: !isDarkMode ? Color.darkTheme : Color.defaultTheme,
              marginHorizontal: 10,
              fontSize: 18,
            }}
          >
            {context.name}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: isDarkMode ? Color.darkTheme : Color.defaultTheme,
            paddingTop: 12,
          }}
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View
        style={{
          padding: 5,
          backgroundColor: isDarkMode ? Color.darkTheme : Color.defaultTheme,
          borderTopWidth: 1,
          borderTopColor: Color.Brown300,
        }}
      >
        <View
          style={{
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <DarkModeSwitch
            value={true}
            color={Color.Brown400}
            onToggle={toggleDarkMode}
          />
          <Text
            style={{
              fontSize: 15,
              marginLeft: 5,
              color: !isDarkMode ? Color.darkTheme : Color.defaultTheme,
            }}
          >
            מצב כהה
          </Text>
        </View>
      </View>

      <View
        style={{
          padding: 15,
          borderTopWidth: 2,
          borderTopColor: Color.Brown300,
          backgroundColor: isDarkMode ? Color.Blue800 : Color.Blue200,
        }}
      >
        <TouchableOpacity
          onPress={() => logoutHandler(auth, navigation)}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="exit-outline"
              size={22}
              color={!isDarkMode ? Color.darkTheme : Color.defaultTheme}
            />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
                color: !isDarkMode ? Color.darkTheme : Color.defaultTheme,
              }}
            >
              התנתק
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CustomDrawer;
