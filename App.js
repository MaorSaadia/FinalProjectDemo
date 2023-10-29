import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import SignInScreen from "./src/screens/SignInScreen";
import StudentsSignUpScreen from "./src/screens/StudentsSignUpScreen";
import LandlordSignUpScreen from "./src/screens/LandlordSignUpScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{ headerTitleAlign: "center" }}
      >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
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
          options={{ title: "", animation: "simple_push" }}
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
