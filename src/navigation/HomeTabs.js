import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DarkTheme,
  Provider as PaperProvider,
} from "react-native-paper";

import { useDarkMode } from "../context/DarkModeContext";
import { Color } from "../constants/colors";
import HomeScreen from "../screens/HomeScreen";
import StudentProfileScreen from "../screens/StudentProfileScreen";

const Tab = createMaterialBottomTabNavigator();

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    secondaryContainer: Color.Brown700,
    text: Color.white,
  },
};

const CustomDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: Color.Brown100,
    text: Color.black,
  },
};

function HomeTabs() {
  const { isDarkMode } = useDarkMode();

  const theme = isDarkMode ? CustomDarkTheme : CustomDefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <Tab.Navigator
        initialRouteName="HomeScreen"
        activeColor={isDarkMode ? Color.Blue400 : Color.Blue900}
        inactiveColor={isDarkMode ? Color.Blue900 : Color.Blue400}
        shifting={true}
        barStyle={{
          backgroundColor: isDarkMode ? Color.Brown700 : Color.Brown100,
        }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarLabel: "בית",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />

        <Tab.Screen
          name="StudentProfileScreen"
          component={StudentProfileScreen}
          options={{
            tabBarLabel: "פרופיל",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </PaperProvider>
  );
}

export default HomeTabs;
