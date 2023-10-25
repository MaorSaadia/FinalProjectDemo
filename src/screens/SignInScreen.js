import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { Color } from "../constants/colors";

function SignInScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        icon="login"
        buttonColor={Color.Blue300}
        mode="contained"
        onPress={() => navigation.navigate("SignUpScreen")}
      >
        Sign Up
      </Button>
    </View>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
