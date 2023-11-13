import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EmptyScreen from "../screens/EmptyScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import SignInScreen from "../screens/SignInScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import StudentsSignUpScreen from "../screens/StudentsSignUpScreen";
import LandlordSignUpScreen from "../screens/LandlordSignUpScreen";
import HomeDrawer from "./HomeDrawer";
import { Color } from "../constants/colors";

const Stack = createNativeStackNavigator();

function StackScreens() {
  return (
    <NavigationContainer>
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
            headerStyle: { backgroundColor: Color.Brown100 },
          }}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{
            title: "",
            animation: "simple_push",
            headerStyle: { backgroundColor: Color.Brown100 },
          }}
        />
        <Stack.Screen
          name="StudentsSignUpScreen"
          component={StudentsSignUpScreen}
          options={{ headerShown: false, animation: "simple_push" }}
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
