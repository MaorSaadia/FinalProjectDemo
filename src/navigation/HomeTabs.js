import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DarkTheme,
  Provider as PaperProvider,
} from "react-native-paper";

import { Color } from "../constants/colors";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { useDarkMode } from "../context/DarkModeContext";

const Tab = createMaterialBottomTabNavigator();

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    secondaryContainer: Color.Brown800,
  },
};

const CustomDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: Color.Brown100,
  },
};

function HomeTabs() {
  const { isDarkMode } = useDarkMode();

  const theme = isDarkMode ? CustomDarkTheme : CustomDefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <Tab.Navigator
        initialRouteName="HomeScreen"
        activeColor={Color.Blue900}
        inactiveColor={Color.Blue500}
        barStyle={{
          backgroundColor: isDarkMode ? Color.Brown800 : Color.Brown100,
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
          name="ProfileScreen"
          component={ProfileScreen}
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
