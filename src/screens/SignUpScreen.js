import * as React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-virtualized-view";

import { Button, RadioButton, Text, TextInput } from "react-native-paper";
import DropDown from "../components/DropDown";
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
        <DropDown
          list={[{ label: "סמי שמעון", value: "סמישמעון" }]}
          label="מוסד אקדמאי"
          listMode="MODAL"
          searchable={true}
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

        <DropDown
          list={[
            { label: "מכינה", value: "pre" },
            { label: "שנה א'", value: "1" },
            { label: "שנה ב'", value: "2" },
            { label: "שנה ג'", value: "3" },
            { label: "שנה ד'", value: "4" },
          ]}
          label="שנתון"
          searchable={false}
          listMode="SCROLLVIEW"
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
