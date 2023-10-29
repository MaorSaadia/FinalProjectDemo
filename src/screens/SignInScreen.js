import { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { Color } from "../constants/colors";
import Input from "../components/Input";
import NavLink from "../components/NavLink";

function SignInScreen({ route }) {
  const { userType } = route.params;

  const [isSecure, setIsSecure] = useState(true);
  const [mail, setMail] = useState();
  const [password, setPassword] = useState();

  return (
    <ImageBackground
      source={require("../../assets/images/Zinc.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        <View style={styles.text}>
          <Text variant="displaySmall" style={{ color: Color.Blue800 }}>
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
          selectionColor={Color.Blue700}
          outlineColor={Color.Blue200}
          activeOutlineColor={Color.Blue800}
          mode="outlined"
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={isSecure}
        />
        {userType === "student" ? (
          <NavLink
            text="אין לך חשבון? לחץ כאן להירשם במקום"
            routeName="StudentsSignUpScreen"
          />
        ) : (
          <NavLink
            text="אין לך חשבון? לחץ כאן להירשם במקום"
            routeName="LandlordSignUpScreen"
          />
        )}
        <Button
          icon="login"
          buttonColor={Color.Blue800}
          mode="contained"
          onPress={() => console.log("Ok")}
        >
          התחבר
        </Button>
      </View>
    </ImageBackground>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
  },
  image: {
    flex: 1,
  },
  text: {
    alignItems: "center",
  },
});
