import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { Color } from "../constants/colors";
import Input from "../components/Input";
import NavLink from "../components/NavLink";

function SignInScreen({ navigation }) {
  const [isSecure, setIsSecure] = useState(true);
  const [mail, setMail] = useState();
  const [password, setPassword] = useState();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.text}>
          <Text variant="displaySmall" style={{ color: Color.Blue400 }}>
            ─── התחברות ───
          </Text>
        </View>
        <Input
          label="מייל"
          mode="outlined"
          onValueChange={(selectedMail) => setMail(selectedMail)}
        />
        <TextInput
          label="סיסמה"
          style={{ backgroundColor: "#fff" }}
          right={
            <TextInput.Icon
              icon={isSecure ? "eye" : "eye-off"}
              onPress={() => setIsSecure(!isSecure)}
            />
          }
          selectionColor={Color.Yellow200}
          outlineColor={Color.Yellow100}
          activeOutlineColor={Color.Yellow400}
          mode="outlined"
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={isSecure}
        />
        <NavLink
          text="אין לך חשבון? לחץ כאן להירשם במקום"
          routeName="SignUpScreen"
        />
        <Button
          icon="login"
          buttonColor={Color.Blue300}
          mode="contained"
          onPress={() => console.log("Ok")}
        >
          התחבר
        </Button>
      </View>
    </>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
  },
  text: {
    alignItems: "center",
    marginBottom: 10,
  },
});
