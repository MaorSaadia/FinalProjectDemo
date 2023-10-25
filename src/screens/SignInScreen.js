import { Button, StyleSheet, Text, View } from "react-native"

function SignInScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SignIn Screen</Text>
      <Button
        title="Go To SignUp Screen"
        onPress={() => navigation.navigate("SignUpScreen")}
      />
    </View>
  )
}

export default SignInScreen

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
