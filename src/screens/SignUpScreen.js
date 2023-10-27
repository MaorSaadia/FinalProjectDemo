import * as React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, RadioButton, Text, TextInput } from "react-native-paper";

import DropDown from "../components/DropDown";
import { Color } from "../constants/colors";
import { academicList } from "../../backend/data/academic";

function SignUpScreen({ navigation }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [academic, setAcademic] = useState();
  const [department, setDepartment] = useState();
  const [yearbook, setYearbook] = useState();
  const [checked, setChecked] = React.useState("male");
  const [mail, setMail] = useState();
  const [password, setPassword] = useState();

  const list = academicList.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const handleAcademicChange = (selectedAcademic) => {
    setAcademic(selectedAcademic);
  };

  const handleYearbookChange = (selectedYearbook) => {
    setYearbook(selectedYearbook);
  };

  return (
    <>
      <View style={styles.container}>
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
      </View>
      <View style={{ paddingHorizontal: 6, paddingBottom: 6 }}>
        <DropDown
          list={list}
          label="מוסד אקדמאי"
          listMode="MODAL"
          searchable={true}
          onValueChange={handleAcademicChange}
        />
      </View>

      <View style={{ paddingTop: 50 }}>
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
              { label: "מכינה", value: "מכינה" },
              { label: "שנה א'", value: "שנה א'" },
              { label: "שנה ב'", value: "שנה ב'" },
              { label: "שנה ג'", value: "שנה ג'" },
              { label: "שנה ד'", value: "שנה ד'" },
            ]}
            label="שנתון"
            searchable={false}
            listMode="SCROLLVIEW"
            onValueChange={handleYearbookChange}
          />
        </View>
      </View>
      <Text style={styles.title} variant="titleMedium">
        מגדר:
      </Text>

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

      <View style={styles.textInput}>
        <TextInput
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
          style={{
            marginTop: 10,
          }}
          icon="login"
          buttonColor={Color.Blue300}
          mode="contained"
          onPress={() => navigation.navigate("SignInScreen")}
        >
          Sign Up
        </Button>
      </View>
    </>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 6,
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
