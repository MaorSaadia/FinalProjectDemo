import * as React from "react";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, RadioButton, Text, TextInput } from "react-native-paper";
import { Color } from "../constants/colors";

function SignUpScreen({ navigation }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [academic, setAcademic] = useState();
  const [department, setDepartment] = useState();
  const [yearbook, setYearbook] = useState();
  const [checked, setChecked] = React.useState("male");
  const [mail, setMail] = useState();
  const [password, setPassword] = useState();

  const year = ["מכינה", "שנה א", "שנה ב", "שנה ג", "שנה ד"];

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 12,
      }}
    >
      <View style={styles.inputsRow}>
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
      </View>
      <View>
        <TextInput
          style={styles.textInput}
          label="מוסד אקדמאי"
          selectionColor={Color.Yellow200}
          underlineColor={Color.Blue400}
          outlineColor={Color.Yellow100}
          activeOutlineColor={Color.Yellow400}
          mode="outlined"
          value={academic}
          onChangeText={(academic) => setAcademic(academic)}
        />
      </View>
      <View style={styles.inputsRow}>
        <TextInput
          style={styles.textInput}
          label="מחלקה"
          selectionColor={Color.Yellow200}
          underlineColor={Color.Blue400}
          outlineColor={Color.Yellow100}
          activeOutlineColor={Color.Yellow400}
          mode="outlined"
          value={department}
          onChangeText={(department) => setDepartment(department)}
        />
        <TextInput
          style={styles.textInput}
          label="שנתון"
          selectionColor={Color.Yellow200}
          underlineColor={Color.Blue400}
          outlineColor={Color.Yellow100}
          activeOutlineColor={Color.Yellow400}
          value={yearbook}
          mode="outlined"
          maxLength={2}
          keyboardType="decimal-pad"
          onChangeText={(yearbook) => setYearbook(yearbook)}
        />
      </View>
      <Text style={styles.title} variant="titleMedium">
        מגדר:
      </Text>
      <View>
        <View style={styles.radioButtom}>
          <RadioButton
            value="male"
            color={Color.Yellow400}
            status={checked === "male" ? "checked" : "unchecked"}
            onPress={() => setChecked("male")}
          />
          <Text style={styles.textRadio}>זכר</Text>
        </View>
        <View style={styles.radioButtom}>
          <RadioButton
            value="female"
            color={Color.Yellow400}
            status={checked === "female" ? "checked" : "unchecked"}
            onPress={() => setChecked("female")}
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
      </View>
      <Button
        icon="login"
        buttonColor={Color.Blue300}
        mode="contained"
        onPress={() => navigation.navigate("SignInScreen")}
      >
        Sign In
      </Button>
    </ScrollView>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    flex: 1,
    margin: 6,
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
