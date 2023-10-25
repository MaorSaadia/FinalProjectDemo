import { StyleSheet, Text, View } from "react-native"
import { Button } from "react-native-paper"
import { Color } from "../constants/colors"

function SignUpScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        icon="login"
        buttonColor={Color.Blue300}
        mode="contained"
        onPress={() => navigation.navigate("SignInScreen")}
      >
        Sign In
      </Button>
    </View>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
})
