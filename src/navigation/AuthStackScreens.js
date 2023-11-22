import { View } from "react-native";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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

const AuthStack = createNativeStackNavigator();

const CustomDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Color.white,
    text: Color.black,
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: Color.darkTheme,
    text: Color.white,
  },
};

function AuthStackScreens() {
  const { isDarkMode } = useDarkMode();

  const theme = isDarkMode ? CustomDarkTheme : CustomDefaultTheme;

  return (
    <NavigationContainer theme={theme}>
      <AuthStack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
        <AuthStack.Screen
          name="EmptyScreen"
          component={EmptyScreen}
          options={{ headerShown: false, title: "" }}
        />

        <AuthStack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{
            headerShown: false,
            presentation: "modal",
            animation: "fade_from_bottom",
          }}
        />
        <AuthStack.Screen
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
        <AuthStack.Screen
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
        <AuthStack.Screen
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
        <AuthStack.Screen
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
        <AuthStack.Screen
          name="LandlordSignUpScreen"
          component={LandlordSignUpScreen}
          options={{ title: "", animation: "simple_push" }}
        />

        <AuthStack.Screen
          name={"HomeDrawer"}
          component={HomeDrawer}
          options={{
            title: "",
            animation: "simple_push",
            headerShown: false,
          }}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

export default AuthStackScreens;
