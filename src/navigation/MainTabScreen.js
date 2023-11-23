import { Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DarkTheme,
  Provider as PaperProvider,
} from "react-native-paper";

import { useDarkMode } from "../context/DarkModeContext";
import { Color } from "../constants/colors";
import HomeStackScreen from "./HomeStackScreen ";
import ProfileStackScreen from "./ProfileStackScreen";

const Tab = createMaterialBottomTabNavigator();

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    secondaryContainer: Color.darkTheme,
    text: Color.white,
  },
};

const CustomDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: Color.white,
    text: Color.black,
  },
};

function MainTabScreen() {
  const { isDarkMode } = useDarkMode();

  const theme = isDarkMode ? CustomDarkTheme : CustomDefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <Tab.Navigator
        initialRouteName="HomeStackScreen"
        activeColor={isDarkMode ? Color.white : Color.black}
        inactiveColor={isDarkMode ? Color.white : Color.black}
        // shifting={true}
        barStyle={{
          backgroundColor: isDarkMode ? Color.darkTheme : Color.white,
          borderTopColor: Color.Brown100,
          borderTopWidth: 1,
          height: 50,
          position: "absolute",
        }}
      >
        <Tab.Screen
          name="HomeStackScreen"
          component={HomeStackScreen}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ focused, color }) => (
              <View style={{ alignItems: "center" }}>
                <MaterialCommunityIcons
                  name={focused ? "home" : "home-outline"}
                  style={{ marginTop: -8 }}
                  color={color}
                  size={26}
                />
                <Text
                  style={{
                    fontSize: 11,
                    color: isDarkMode ? Color.white : Color.black,
                  }}
                >
                  בית
                </Text>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="StudentProfileScreen"
          component={ProfileStackScreen}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ focused, color }) => (
              <View style={{ alignItems: "center" }}>
                <MaterialCommunityIcons
                  name={focused ? "account" : "account-outline"}
                  style={{ marginTop: -8 }}
                  color={color}
                  size={26}
                />
                <Text
                  style={{
                    fontSize: 11,
                    color: isDarkMode ? Color.white : Color.black,
                  }}
                >
                  פרופיל
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </PaperProvider>
  );
}

export default MainTabScreen;
