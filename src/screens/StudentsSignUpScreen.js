import React, { useContext, useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import { Button, RadioButton, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

import { useDarkMode } from "../context/DarkModeContext";
import { StudentContext } from "../context/StudentContext";
import { Color } from "../constants/colors";
import { academicList } from "../../backend/data/academic";
import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";
import DropDown from "../components/DropDown";
import NavLink from "../components/NavLink";
import ErrorMessage from "../components/ui/ErrorMessage";
import Spacer from "../components/ui/Spacer";
import signUp from "../api/authentication/signUp";

function StudentsSignUpScreen({ route }) {
  const auth = useContext(StudentContext);
  const { isDarkMode } = useDarkMode();
  const navigation = useNavigation();

  const { userType } = route.params;
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [academic, setAcademic] = useState();
  const [department, setDepartment] = useState();
  const [yearbook, setYearbook] = useState();
  const [checked, setChecked] = useState("זכר");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();

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
    { label: "תואר שני", value: "תואר שני" },
  ];

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (err) {
      console.log(err);
    }
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({
      userType,
      name,
      age,
      academic,
      department,
      yearbook,
      gender,
      email,
      password,
      passwordConfirm,
    }) =>
      signUp({
        userType,
        name,
        age,
        academic,
        department,
        yearbook,
        gender,
        email,
        password,
        passwordConfirm,
      }),
    onSuccess: (user) => {
      storeData("token", user.token);
      auth.login(user.data.user, user.token);
      Toast.show(
        {
          type: "success",
          text1: "חשבון נוצר בהצלחה",
        },
        navigation.navigate("HomeDrawer")
      );
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  const handleSignUp = () => {
    mutate({
      userType,
      name,
      age,
      academic,
      department,
      yearbook,
      gender: checked,
      email,
      password,
      passwordConfirm,
    });
  };

  const getBackgroundImage = (isDarkMode) => {
    return isDarkMode
      ? require("../../assets/images/MidnightCity.jpg")
      : require("../../assets/images/Zinc.jpg");
  };

  return (
    <ImageBackground
      source={getBackgroundImage(isDarkMode)}
      resizeMode="cover"
      style={styles.image}
    >
      <ScrollView>
        <View style={{ ...styles.container, ...styles.text }}>
          <Text
            variant="displaySmall"
            style={{ color: Color.Blue800, fontFamily: "italic" }}
          >
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
            keyboardType="email-address"
            onValueChange={(selectedemail) => setEmail(selectedemail)}
          />

          <PasswordInput
            mode="outlined"
            label="סיסמה"
            onValueChange={(password) => setPassword(password)}
          />

          <PasswordInput
            mode="outlined"
            label="אשר סיסמה"
            onValueChange={(passwordConfirm) =>
              setPasswordConfirm(passwordConfirm)
            }
          />

          {isError && <ErrorMessage errorMessage={error.message} />}

          <Spacer>
            <NavLink
              text="כבר יש לך חשבון? היכנס במקום זאת"
              routeName="SignInScreen"
              props={{ userType: userType }}
            />
          </Spacer>

          <Button
            buttonColor={Color.Blue800}
            textColor={Color.defaultTheme}
            mode="contained"
            onPress={handleSignUp}
            loading={isPending}
          >
            {isPending ? "" : "הרשם"}
          </Button>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

export default StudentsSignUpScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
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
