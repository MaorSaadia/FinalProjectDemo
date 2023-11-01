import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import SignInScreen from "./src/screens/SignInScreen";
import StudentsSignUpScreen from "./src/screens/StudentsSignUpScreen";
import LandlordSignUpScreen from "./src/screens/LandlordSignUpScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WelcomeScreen"
        screenOptions={{ headerTitleAlign: "center" }}
      >
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
