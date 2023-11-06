import { useEffect } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const HomeScreen = () => {
  useEffect(() => {
    const handleBackPress = () => {
      // Check if it's the first screen, and if so, exit the app
      if (isFirstScreen()) {
        BackHandler.exitApp();
        return true; // Prevents further back actions
      }
      return false; // Allow default back behavior
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => backHandler.remove();
  }, []);

  const isFirstScreen = () => {
    return true;
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
