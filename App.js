import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Color } from "./src/constants/colors";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import SignInScreen from "./src/screens/SignInScreen";
import StudentsSignUpScreen from "./src/screens/StudentsSignUpScreen";
import LandlordSignUpScreen from "./src/screens/LandlordSignUpScreen";
import HomeDrawer from "./src/navigation/HomeDrawer";
import EmptyScreen from "./src/screens/EmptyScreen";

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
          <Stack.Screen name="EmptyScreen" component={EmptyScreen} />

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
    </QueryClientProvider>
  );
}
