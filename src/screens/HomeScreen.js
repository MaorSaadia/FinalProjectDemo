import { useEffect } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const HomeScreen = () => {
  useEffect(() => {
    const handleBackPress = () => {
      // Check if it's the first screen, and if so, exit the app
      if (isFirstScreen()) {
        BackHandler.exitApp(); // Exits the app
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
    // Implement your logic to determine if the current screen is the first screen
    // For example, you might check a navigation state or a flag.
    // Replace this with your logic accordingly.
    return true; // Replace with your condition to check if it's the first screen
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
