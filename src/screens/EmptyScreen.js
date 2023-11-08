import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Loader from "../components/ui/Loader";
import { Color } from "../constants/colors";

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
