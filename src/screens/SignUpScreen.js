import React from "react";

import { StyleSheet, View } from "react-native";
import { Button, RadioButton, Text, TextInput } from "react-native-paper";
import { Color } from "../constants/colors";
import { useState } from "react";

function SignUpScreen({ navigation }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [checked, setChecked] = React.useState("first");
  const [mail, setMail] = useState();
  const [password, setPassword] = useState();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        label="שם מלא"
        selectionColor={Color.Yellow200}
        underlineColor={Color.Blue400}
        outlineColor={Color.Yellow100}
        activeOutlineColor={Color.Yellow400}
        mode="outlined"
        value={name}
        onChangeText={(name) => setName(name)}
      />
      <TextInput
        style={styles.textInput}
        label="גיל"
        selectionColor={Color.Yellow200}
        underlineColor={Color.Blue400}
        outlineColor={Color.Yellow100}
        activeOutlineColor={Color.Yellow400}
        value={age}
        mode="outlined"
        maxLength={2}
        keyboardType="decimal-pad"
        onChangeText={(age) => setAge(age)}
      />
      <Text style={styles.title} variant="titleMedium">
        מגדר:
      </Text>
      <View style={styles.radioButtom}>
        <RadioButton
          value="first"
          color={Color.Yellow400}
          status={checked === "first" ? "checked" : "unchecked"}
          onPress={() => setChecked("first")}
        />
        <Text style={styles.textRadio}>זכר</Text>
      </View>
      <View style={styles.radioButtom}>
        <RadioButton
          value="second"
          color={Color.Yellow400}
          status={checked === "second" ? "checked" : "unchecked"}
          onPress={() => setChecked("second")}
        />
        <Text style={styles.textRadio}>נקבה</Text>
      </View>
      <TextInput
        style={styles.textInput}
        label="מייל"
        selectionColor={Color.Yellow200}
        underlineColor={Color.Blue400}
        outlineColor={Color.Yellow100}
        activeOutlineColor={Color.Yellow400}
        value={mail}
        mode="outlined"
        onChangeText={(mail) => setMail(mail)}
      />
      <TextInput
        style={styles.textInput}
        label="סיסמה"
        secureTextEntry
        right={<TextInput.Icon icon="eye" />}
        selectionColor={Color.Yellow200}
        underlineColor={Color.Blue400}
        outlineColor={Color.Yellow100}
        activeOutlineColor={Color.Yellow400}
        value={password}
        mode="outlined"
        onChangeText={(password) => setPassword(password)}
      />
      <Button
        icon="login"
        buttonColor={Color.Blue300}
        mode="contained"
        onPress={() => navigation.navigate("SignInScreen")}
      >
        Sign In
      </Button>
    </View>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 12,
    marginBottom: 100,
  },
  textInput: {
    margin: 12,
  },
  title: {
    paddingHorizontal: 20,
  },
  radioButtom: {
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  textRadio: {
    paddingTop: 6,
  },
});
