import { ImageBackground, StyleSheet } from "react-native";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { Color } from "../constants/colors";

function HomeScreen({ navigation }) {
  return (
    <>
      {/* <ImageBackground
        source={require("../../assets/housing-garden.jpg")}
        resizeMode="cover"
        style={styles.image}
      ></ImageBackground> */}

      <View style={styles.text}>
        <Text
          variant="displaySmall"
          style={{ color: Color.Blue400, marginTop: 15 }}
        >
          ─── ברוכים הבאים ───
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
    </>
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
    justifyContent: "center",
  },
  text: {
    alignItems: "center",
    marginBottom: 10,
  },
  button: {
    margin: 10,
  },
});
