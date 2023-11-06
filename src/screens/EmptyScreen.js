import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

function EmptyScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        navigation.navigate("HomeDrawer");
      } else {
        navigation.navigate("WelcomeScreen");
      }
    }

    fetchToken();
  }, []);

  return null;
}

export default EmptyScreen;
