import * as NavigationBar from "expo-navigation-bar";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { DrawerActions } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useDarkMode } from "../context/DarkModeContext";
import { Color } from "../constants/colors";
import CustomDrawer from "../components/CustomDrawer";
import MainTabScreen from "./MainTabScreen";
import ChatStackScreen from "./ChatStackScreen";

const Drawer = createDrawerNavigator();

function HomeDrawer({ navigation }) {
  const { isDarkMode } = useDarkMode();

  NavigationBar.setBackgroundColorAsync(
    isDarkMode ? Color.darkTheme : Color.white
  );

  useFocusEffect(
    useCallback(() => {
      const closeDrawer = () => {
        navigation.dispatch(DrawerActions.closeDrawer());
      };

      closeDrawer();
      return () => {};
    }, [navigation])
  );

  return (
    <Drawer.Navigator
      initialRouteName="MainTabScreen"
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
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
        swipeEdgeWidth: 300,
      }}
    >
      <Drawer.Screen
        name="בית"
        component={MainTabScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="צ'אט"
        component={ChatStackScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default HomeDrawer;
