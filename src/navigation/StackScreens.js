import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ScreenStackHeaderBackButtonImage } from "react-native-screens";

import EmptyScreen from "../screens/EmptyScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import SignInScreen from "../screens/SignInScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import StudentsSignUpScreen from "../screens/StudentsSignUpScreen";
import LandlordSignUpScreen from "../screens/LandlordSignUpScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import HomeDrawer from "./HomeDrawer";
import { Color } from "../constants/colors";
import { useDarkMode } from "../context/DarkModeContext";
import { View } from "react-native";

const Stack = createNativeStackNavigator();

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: Color.darkTheme,
    text: Color.white,
  },
};

const CustomDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#ffffff",
    text: Color.black,
  },
};

function StackScreens() {
  const { isDarkMode } = useDarkMode();

  const theme = isDarkMode ? CustomDarkTheme : CustomDefaultTheme;

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen
          name="EmptyScreen"
          component={EmptyScreen}
          options={{ headerShown: false, title: "" }}
        />

        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{
            headerShown: false,
            presentation: "modal",
            animation: "fade_from_bottom",
          }}
        />
        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
          options={{
            title: "",
            animation: "simple_push",
            headerStyle: {
              backgroundColor: Color.Blue600,
            },
          }}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{
            title: "",
            animation: "slide_from_right",
            headerStyle: {
              backgroundColor: Color.Blue600,
            },
          }}
        />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
          options={{
            title: "",
            animation: "slide_from_right",
            header: () => (
              <View
                style={{ height: 40, backgroundColor: Color.Blue600 }}
              ></View>
            ),
          }}
        />
        <Stack.Screen
          name="StudentsSignUpScreen"
          component={StudentsSignUpScreen}
          options={{
            // headerShown: false,
            title: "",
            animation: "simple_push",
            header: () => (
              <View
                style={{ height: 40, backgroundColor: Color.Blue600 }}
              ></View>
            ),
          }}
        />
        <Stack.Screen
          name="LandlordSignUpScreen"
          component={LandlordSignUpScreen}
          options={{ title: "", animation: "simple_push" }}
        />

        <Stack.Screen
          name={"HomeDrawer"}
          component={HomeDrawer}
          options={{
            title: "",
            animation: "simple_push",
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackScreens;
