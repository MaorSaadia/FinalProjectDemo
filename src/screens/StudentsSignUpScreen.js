import * as React from "react";
import { useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import { Button, RadioButton, Text, TextInput } from "react-native-paper";

import DropDown from "../components/DropDown";
import { Color } from "../constants/colors";
import { academicList } from "../../backend/data/academic";
import Input from "../components/Input";
import NavLink from "../components/NavLink";

function StudentsSignUpScreen({ route }) {
  const { userType } = route.params;

  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [academic, setAcademic] = useState();
  const [department, setDepartment] = useState();
  const [yearbook, setYearbook] = useState();
  const [checked, setChecked] = React.useState("זכר");
  const [mail, setMail] = useState();
  const [password, setPassword] = useState();
  const [isSecure, setIsSecure] = useState(true);

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

  return (
    <ImageBackground
      source={require("../../assets/images/Zinc.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <ScrollView>
        <View style={{ ...styles.container, ...styles.text }}>
          <Text variant="displaySmall" style={{ color: Color.Blue800 }}>
            ──── הרשם ────
          </Text>
        </View>
        <View style={styles.inputsRow}>
          <Input
            style={styles.textInput}
            label="שם מלא"
            mode="outlined"
            onValueChange={(selectedName) => setName(selectedName)}
          />

          <Input
            style={styles.textInput}
            label="גיל"
            mode="outlined"
            keyboardType="decimal-pad"
            maxLength={2}
            onValueChange={(selectedAge) => setAge(selectedAge)}
          />
        </View>

        <View style={{ paddingHorizontal: 6 }}>
          <DropDown
            list={listAcademic}
            label="מוסד אקדמאי"
            listMode="MODAL"
            searchable={true}
            onValueChange={(selectedAcademic) => setAcademic(selectedAcademic)}
          />
        </View>

        <View>
          <View style={styles.inputsRow}>
            <Input
              style={styles.textInput}
              label="מחלקה"
              mode="outlined"
              onValueChange={(selectedDepartment) =>
                setDepartment(selectedDepartment)
              }
            />
            <DropDown
              list={listYear}
              label="שנתון"
              searchable={false}
              listMode="SCROLLVIEW"
              onValueChange={(selectedYearbook) =>
                setYearbook(selectedYearbook)
              }
            />
          </View>
        </View>

        <Text style={styles.title} variant="titleMedium">
          מגדר:
        </Text>

        <View style={styles.radioButtom}>
          <RadioButton
            value="זכר"
            color={Color.Blue500}
            status={checked === "זכר" ? "checked" : "unchecked"}
            onPress={() => setChecked("זכר")}
          />
          <Text style={styles.textRadio}>זכר</Text>
        </View>
        <View style={styles.radioButtom}>
          <RadioButton
            value="נקבה"
            color={Color.Blue500}
            status={checked === "נקבה" ? "checked" : "unchecked"}
            onPress={() => setChecked("נקבה")}
          />
          <Text style={styles.textRadio}>נקבה</Text>
        </View>

        <View style={styles.textInput}>
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
          <NavLink
            text="כבר יש לך חשבון? היכנס במקום זאת"
            routeName="SignInScreen"
            props={{ userType: userType }}
          />
          <Button
            buttonColor={Color.Blue800}
            mode="contained"
            onPress={() => console.log("Ok")}
          >
            הרשם
          </Button>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

export default StudentsSignUpScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
  },
  image: {
    flex: 1,
  },
  text: {
    alignItems: "center",
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
    fontWeight: "bold",
  },
  radioButtom: {
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  textRadio: {
    paddingTop: 6,
  },
});
