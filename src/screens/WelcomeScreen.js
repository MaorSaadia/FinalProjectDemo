import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

import { Color } from "../constants/colors";

function WelcomeScreen({ navigation }) {
  return (
    <>
      <StatusBar style="dark" />
      <ImageBackground
        source={require("../../assets/images/home-background.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.text}>
          <Text
            variant="displaySmall"
            style={{ color: Color.Blue700, marginTop: 15 }}
          >
            ── ברוכים הבאים ──
          </Text>
        </View>

        <View style={styles.container}>
          <Button
            style={styles.button}
            buttonColor={Color.Blue600}
            textColor={Color.white}
            icon="school"
            mode="elevated"
            onPress={() =>
              navigation.navigate("SignInScreen", { userType: "student" })
            }
          >
            סטודנט
          </Button>
          <Button
            style={styles.button}
            buttonColor={Color.Blue600}
            textColor={Color.white}
            icon="home-account"
            onPress={() =>
              navigation.navigate("SignInScreen", { userType: "landlord" })
            }
            mode="elevated"
          >
            משכיר
          </Button>
          <Button
            style={styles.button}
            buttonColor={Color.Brown600}
            textColor={Color.white}
            onPress={() => navigation.navigate("HomeDrawer")}
            mode="elevated"
          >
            עמוד הבית
          </Button>
        </View>
      </ImageBackground>
    </>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 100,
  },
  image: {
    flex: 1,
    opacity: 0.9,
  },
  text: {
    alignItems: "center",
    marginTop: 30,
  },
  button: {
    margin: 10,
  },
});
