import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MenuProvider } from "react-native-popup-menu";
import Toast from "react-native-toast-message";

import { StudentContext, useStudents } from "./src/context/StudentContext";
import { DarkModeProvider } from "./src/context/DarkModeContext";
import AuthStackScreens from "./src/navigation/AuthStackScreens";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

export default function App() {
  const [appIsLoaded, setAppIsLoaded] = useState(false);
  const {
    login,
    logout,
    token,
    id,
    name,
    avatar,
    age,
    gender,
    academic,
    department,
    yearbook,
    email,
  } = useStudents();

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          black: require("./assets/fonts//Roboto-Black.ttf"),
          blackItalic: require("./assets/fonts/Roboto-BlackItalic.ttf"),
          bold: require("./assets/fonts/Roboto-Bold.ttf"),
          boldItalic: require("./assets/fonts/Roboto-BoldItalic.ttf"),
          italic: require("./assets/fonts/Roboto-Italic.ttf"),
          light: require("./assets/fonts/Roboto-Light.ttf"),
          lightItalic: require("./assets/fonts/Roboto-LightItalic.ttf"),
          medium: require("./assets/fonts/Roboto-Medium.ttf"),
          mediumItalic: require("./assets/fonts/Roboto-MediumItalic.ttf"),
          regular: require("./assets/fonts/Roboto-Regular.ttf"),
          thin: require("./assets/fonts/Roboto-Thin.ttf"),
          thinItalic: require("./assets/fonts/Roboto-ThinItalic.ttf"),
          varelaRound: require("./assets/fonts/VarelaRound-Regular.ttf"),
        });
      } catch (error) {
        console.log.error();
      } finally {
        setAppIsLoaded(true);
      }
    };

    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsLoaded]);

  if (!appIsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayout}>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <StudentContext.Provider
            value={{
              token,
              id,
              name,
              avatar,
              age,
              gender,
              academic,
              department,
              yearbook,
              email,
              login,
              logout,
            }}
          >
            <StatusBar style="dark" />
            <MenuProvider>
              <AuthStackScreens />
            </MenuProvider>
            <Toast />
          </StudentContext.Provider>
        </QueryClientProvider>
      </DarkModeProvider>
    </SafeAreaProvider>
  );
}
