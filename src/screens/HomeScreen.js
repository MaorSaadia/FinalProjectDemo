import { ImageBackground, StyleSheet } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { Color } from "../constants/colors";

function HomeScreen({ navigation }) {
  NavigationBar.setVisibilityAsync("hidden");

  return (
    <ImageBackground
      source={require("../../assets/images/home-background.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.text}>
        <Text
          variant="displaySmall"
          style={{ color: Color.Blue400, marginTop: 15 }}
        >
          ── ברוכים הבאים ──
        </Text>
      </View>

      <View style={styles.container}>
        <Button
          style={styles.button}
          buttonColor={Color.Blue300}
          textColor="#fff"
          icon="school"
          mode="elevated"
          onPress={() => navigation.navigate("SignInScreen")}
        >
          סטודנט
        </Button>
        <Button
          style={styles.button}
          buttonColor={Color.Blue300}
          textColor="#fff"
          icon="home-account"
          onPress={() => navigation.navigate("SignInScreen")}
          mode="elevated"
        >
          משכיר
        </Button>
      </View>
    </ImageBackground>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 10,
  },
  image: {
    flex: 1,
  },
  text: {
    alignItems: "center",
    marginTop: 30,
  },
  button: {
    margin: 10,
  },
});
