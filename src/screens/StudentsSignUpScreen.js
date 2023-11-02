import { ADDRESS } from "@env";
import { useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import { Button, RadioButton, Text, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import DropDown from "../components/DropDown";
import { Color } from "../constants/colors";
import { academicList } from "../../backend/data/academic";
import Input from "../components/Input";
import NavLink from "../components/NavLink";

function StudentsSignUpScreen({ route }) {
  const navigation = useNavigation();
  const { userType } = route.params;

  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [academic, setAcademic] = useState();
  const [department, setDepartment] = useState();
  const [yearbook, setYearbook] = useState();
  const [checked, setChecked] = useState("זכר");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [isSecure1, setIsSecure1] = useState(true);
  const [isSecure2, setIsSecure2] = useState(true);

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

  const handleSignUp = () => {
    // Gather all form data
    const formData = {
      name,
      age,
      academic,
      department,
      yearbook,
      gender: checked,
      email,
      password,
      passwordConfirm,
    };

    fetch(`http://${ADDRESS}:3000/api/v1/students/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response accordingly, e.g., show a success message, redirect, etc.
        console.log("Sign-up successful:", data);
      })
      .catch((error) => {
        // Handle any errors that occur during the sign-up process
        console.error("Sign-up error:", error);
      });
    //navigation.navigate("HomeScreen");
    //console.log(formData);
  };

  return (
    <ImageBackground
      source={require("../../assets/images/Zinc.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <ScrollView>
        <View style={{ ...styles.container, ...styles.text }}>
          <Text variant="displaySmall" style={{ color: Color.Blue800 }}>
            ──── הירשם ────
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
            onValueChange={(selectedemail) => setEmail(selectedemail)}
          />
          <TextInput
            label="סיסמה"
            style={{ backgroundColor: "#fff" }}
            right={
              <TextInput.Icon
                icon={isSecure1 ? "eye" : "eye-off"}
                onPress={() => setIsSecure1(!isSecure1)}
              />
            }
            selectionColor={Color.Blue700}
            outlineColor={Color.Blue200}
            activeOutlineColor={Color.Blue800}
            mode="outlined"
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={isSecure1}
          />

          <TextInput
            label="אשר סיסמה"
            style={{ backgroundColor: "#fff" }}
            right={
              <TextInput.Icon
                icon={isSecure2 ? "eye" : "eye-off"}
                onPress={() => setIsSecure2(!isSecure2)}
              />
            }
            selectionColor={Color.Blue700}
            outlineColor={Color.Blue200}
            activeOutlineColor={Color.Blue800}
            mode="outlined"
            onChangeText={(passwordConfirm) =>
              setPasswordConfirm(passwordConfirm)
            }
            secureTextEntry={isSecure2}
          />

          <NavLink
            text="כבר יש לך חשבון? היכנס במקום זאת"
            routeName="SignInScreen"
            props={{ userType: userType }}
          />
          <Button
            buttonColor={Color.Blue800}
            mode="contained"
            onPress={handleSignUp}
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
    paddingTop: 100,
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
