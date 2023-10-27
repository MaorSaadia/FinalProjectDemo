import * as React from "react";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, RadioButton, Text, TextInput } from "react-native-paper";

import DropDown from "../components/DropDown";
import { Color } from "../constants/colors";
import { academicList } from "../../backend/data/academic";
import Input from "../components/Input";

function SignUpScreen({ navigation }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [academic, setAcademic] = useState();
  const [department, setDepartment] = useState();
  const [yearbook, setYearbook] = useState();
  const [checked, setChecked] = React.useState("male");
  const [mail, setMail] = useState();
  const [password, setPassword] = useState();

  const listAcademic = academicList.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const listYear = [
    { label: "מכינה", value: "מכינה" },
    { label: "שנה א'", value: "שנה א'" },
    { label: "שנה ב'", value: "שנה ב'" },
    { label: "שנה ג'", value: "שנה ג'" },
    { label: "שנה ד'", value: "שנה ד'" },
  ];

  const handleNameChange = (selectedName) => {
    setName(selectedName);
  };

  const handleAgeChange = (selectedAge) => {
    setAge(selectedAge);
  };

  const handleAcademicChange = (selectedAcademic) => {
    setAcademic(selectedAcademic);
  };

  const handleDepartmentChange = (selectedDepartment) => {
    setDepartment(selectedDepartment);
  };

  const handleYearbookChange = (selectedYearbook) => {
    setYearbook(selectedYearbook);
  };

  const handleMailChange = (selectedMail) => {
    setMail(selectedMail);
  };

  return (
    <ScrollView>
      <View style={{ ...styles.container, ...styles.inputsRow }}>
        <Input
          style={styles.textInput}
          label="שם מלא"
          mode="outlined"
          onValueChange={handleNameChange}
        />

        <Input
          style={styles.textInput}
          label="גיל"
          mode="outlined"
          keyboardType="decimal-pad"
          onValueChange={handleAgeChange}
        />
      </View>

      <View style={{ paddingHorizontal: 6 }}>
        <DropDown
          list={listAcademic}
          label="מוסד אקדמאי"
          listMode="MODAL"
          searchable={true}
          onValueChange={handleAcademicChange}
        />
      </View>

      <View>
        <View style={styles.inputsRow}>
          <Input
            style={styles.textInput}
            label="מחלקה"
            mode="outlined"
            onValueChange={handleDepartmentChange}
          />

          <DropDown
            list={listYear}
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
        <Input label="מייל" mode="outlined" onValueChange={handleMailChange} />
        <TextInput
          label="סיסמה"
          style={{ backgroundColor: "#fff" }}
          secureTextEntry
          right={<TextInput.Icon icon="eye" />}
          selectionColor={Color.Yellow200}
          outlineColor={Color.Yellow100}
          activeOutlineColor={Color.Yellow400}
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
    </ScrollView>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 75,
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
