import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as NavigationBar from "expo-navigation-bar";

import WelcomeScreen from "./src/screens/WelcomeScreen";
import SignInScreen from "./src/screens/SignInScreen";
import StudentsSignUpScreen from "./src/screens/StudentsSignUpScreen";
import LandlordSignUpScreen from "./src/screens/LandlordSignUpScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import { Color } from "./src/constants/colors";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function Home() {
  NavigationBar.setVisibilityAsync("hidden");

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      activeColor={Color.Blue900}
      barStyle={{ backgroundColor: Color.Brown100 }}
      tabBarOptions={{
        activeTintColor: "red", // Change this to the color you want for the active tab
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
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
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

          <Stack.Screen
            name={"Home"}
            component={Home}
            options={{ title: "", animation: "simple_push" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
