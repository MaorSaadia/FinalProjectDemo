import { StyleSheet, Text, View } from "react-native"
import { Button } from "react-native-paper"

function SignUpScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        icon="login"
        buttonColor="#6495ED"
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
