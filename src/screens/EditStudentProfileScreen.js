import { ADDRESS } from "@env";
import { useContext, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, RadioButton, Text, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import DropDown from "../components/DropDown";
import { Color } from "../constants/colors";
import { academicList } from "../../backend/data/academic";
import Input from "../components/Input";
import { StudentContext } from "../context/StudentContext";
import ErrorMessage from "../components/ui/ErrorMessage";
import { useDarkMode } from "../context/DarkModeContext";
import Spacer from "../components/ui/Spacer";

function EditStudentProfileScreen() {
  const auth = useContext(StudentContext);
  const { isDarkMode } = useDarkMode();

  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [academic, setAcademic] = useState();
  const [department, setDepartment] = useState();
  const [yearbook, setYearbook] = useState();
  const [checked, setChecked] = useState("זכר");
  const [email, setEmail] = useState();

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

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (err) {
      console.log(err);
    }
  };

  const SignUp = async ({
    name,
    age,
    academic,
    department,
    yearbook,
    gender,
    email,
  }) => {
    try {
      const response = await fetch(
        `http://${ADDRESS}:3000/api/v1/students/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            age,
            academic,
            department,
            yearbook,
            gender,
            email,
          }),
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      return responseData;
    } catch (err) {
      throw new Error(err);
    }
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({
      name,
      age,
      academic,
      department,
      yearbook,
      gender,
      email,
    }) =>
      SignUp({
        name,
        age,
        academic,
        department,
        yearbook,
        gender,
        email,
      }),
    onSuccess: (user) => {
      storeData("token", user.token);
      auth.login(user.data);
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
      name,
      age,
      academic,
      department,
      yearbook,
      gender: checked,
      email,
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}></View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity>
          <View
            style={{
              height: 100,
              width: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ImageBackground
              source={require("../../backend/public/img/users/default.png")}
              style={{ height: 100, width: 100 }}
              imageStyle={{
                borderRadius: 50,
                borderWidth: 2,
                borderColor: isDarkMode ? Color.defaultTheme : Color.darkTheme,
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Icon
                  name="camera"
                  size={25}
                  color={Color.darkTheme}
                  style={{ opacity: 0.4 }}
                />
              </View>
            </ImageBackground>
            <Text style={{ marginBottom: 20 }}> עדכן תמונה </Text>
          </View>
        </TouchableOpacity>
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
            onValueChange={(selectedYearbook) => setYearbook(selectedYearbook)}
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

        {isError && <ErrorMessage errorMessage={error.message} />}
        <Spacer>
          <Button
            style={{ marginTop: 10 }}
            textColor={Color.defaultTheme}
            buttonColor={Color.Blue800}
            mode="contained"
            onPress={handleSignUp}
            loading={isPending}
          >
            {isPending ? "" : "עדכן"}
          </Button>
        </Spacer>
      </View>
    </ScrollView>
  );
}

export default EditStudentProfileScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
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
