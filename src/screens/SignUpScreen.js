import { Button, StyleSheet, Text, View } from "react-native"

function SignUpScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SignUp Screen</Text>
      <Button
        title="Go To SignIn Screen"
        onPress={() => navigation.navigate("SignInScreen")}
      />
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
    marginBottom: 10,
  },
})
