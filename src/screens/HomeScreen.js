import { useEffect } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const handleBackPress = () => {
      if (isFirstScreen()) {
        BackHandler.exitApp();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => backHandler.remove();
  }, []);

  const isFirstScreen = () => {
    // Check if the current route name is 'HomeScreen'
    return navigation.isFocused() && route.name === "בית";
  };

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
