import { ADDRESS } from "@env";
import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, RadioButton, Text, TextInput } from "react-native-paper";
import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useDarkMode } from "../context/DarkModeContext";
import { StudentContext, useStudents } from "../context/StudentContext";
import { Color } from "../constants/colors";
import { academicList } from "../../backend/data/academic";
import DropDown from "../components/DropDown";
import Input from "../components/Input";
import ErrorMessage from "../components/ui/ErrorMessage";
import Spacer from "../components/ui/Spacer";
import TakePhoto from "../components/TakePhoto";
import ImagePicker from "../components/ImagePicker";

function EditStudentProfileScreen() {
  const { isDarkMode } = useDarkMode();
  const auth = useContext(StudentContext);
  const { context } = useStudents();
  const navigation = useNavigation();

  const { token } = context;
  const [avatar, setAvatar] = useState(
    "https://img.myloview.cz/nalepky/default-avatar-profile-icon-vector-social-media-user-image-700-205124837.jpg"
  );
  const [name, setName] = useState(context.name);
  const [age, setAge] = useState(context.age);
  const [academic, setAcademic] = useState(context.academic);
  const [department, setDepartment] = useState(context.department);
  const [yearbook, setYearbook] = useState(context.yearbook);
  const [checked, setChecked] = useState(context.gender);
  const [email, setEmail] = useState(context.email);
  const [isButtomSheetOpen, SetIsButtomSheetOpen] = useState(false);

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

  const updateMe = async ({
    avatar,
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
        `http://${ADDRESS}:3000/api/v1/students/updateMe`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            avatar,
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
      avatar,
      name,
      age,
      academic,
      department,
      yearbook,
      gender,
      email,
    }) =>
      updateMe({
        avatar,
        name,
        age,
        academic,
        department,
        yearbook,
        gender,
        email,
      }),
    onSuccess: (user) => {
      auth.login(user.data.updatedStudent, token);
      Toast.show({
        type: "success",
        text1: "פרופיל עודכן בהצלחה",
      });
      navigation.goBack();
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: err.message,
      });
    },
  });

  const handleUpdateMe = () => {
    mutate({
      avatar,
      name,
      age,
      academic,
      department,
      yearbook,
      gender: checked,
      email,
    });
  };

  const bottomSheetModalRef = useRef(null);

  // const snapPoints = useMemo(() => ["20%", "40%", "60%", "80%"], []);
  const snapPoints = useMemo(() => ["30%", "60%"], []);

  const handlePresentModalOpen = useCallback(() => {
    SetIsButtomSheetOpen((prevState) => !prevState);
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentModalClose = useCallback(() => {
    SetIsButtomSheetOpen((prevState) => !prevState);
    bottomSheetModalRef.current?.dismiss();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={
              isButtomSheetOpen
                ? handlePresentModalClose
                : handlePresentModalOpen
            }
          >
            <View
              style={{
                height: 100,
                width: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={{ uri: avatar }}
                style={{ height: 100, width: 100 }}
                imageStyle={{
                  borderRadius: 50,
                  borderWidth: 2,
                  borderColor: Color.Blue600,
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
              <Text style={{ marginBottom: 30 }}>עדכן תמונה</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.inputsRow}>
          <Input
            style={styles.textInput}
            label={name ? "" : "שם מלא"}
            value={name}
            left={<TextInput.Icon icon={"account-outline"} />}
            mode="outlined"
            onValueChange={(name) => setName(name)}
          />
          <Input
            style={styles.textInput}
            label={age ? "" : "גיל"}
            value={age}
            left={<TextInput.Icon icon={"calendar-account-outline"} />}
            mode="outlined"
            keyboardType="decimal-pad"
            maxLength={2}
            onValueChange={(selectedAge) => setAge(selectedAge)}
          />
        </View>
        <View style={{ paddingHorizontal: 6 }}>
          <DropDown
            list={listAcademic}
            label={academic}
            listMode="MODAL"
            searchable={true}
            onValueChange={(selectedAcademic) => setAcademic(selectedAcademic)}
          />
        </View>

        <View>
          <View style={styles.inputsRow}>
            <Input
              style={styles.textInput}
              label={department ? "" : "מחלקה"}
              value={department}
              left={<TextInput.Icon icon={"school-outline"} />}
              mode="outlined"
              onValueChange={(selectedDepartment) =>
                setDepartment(selectedDepartment)
              }
            />
            <DropDown
              list={listYear}
              label={yearbook}
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
            label={email ? "" : "אימייל"}
            value={email}
            left={<TextInput.Icon icon={"email-outline"} />}
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
              onPress={handleUpdateMe}
              loading={isPending}
            >
              {isPending ? "" : "עדכן"}
            </Button>
          </Spacer>
          <Button
            mode="text"
            style={{ marginTop: -10 }}
            textColor={Color.Blue800}
            onPress={() => navigation.goBack()}
          >
            {"חזור"}
          </Button>
        </View>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          backgroundStyle={{
            backgroundColor: isDarkMode
              ? Color.buttomSheetDarkTheme
              : Color.defaultTheme,
          }}
          handleIndicatorStyle={{
            backgroundColor: isDarkMode
              ? Color.defaultTheme
              : Color.buttomSheetDarkTheme,
          }}
        >
          <View style={styles.sheetContainer}>
            <Text style={styles.panelTitle}>עדכן תמונה</Text>
            <Text style={styles.panelSubtitle}>בחר את תמונת הפרופיל שלך</Text>

            <ImagePicker onPickImage={(image) => setAvatar(image)} />
            <TakePhoto onTakeImage={(image) => setAvatar(image)} />

            <Button
              mode="text"
              style={{ marginTop: -10 }}
              textColor={
                isDarkMode ? Color.defaultTheme : Color.buttomSheetDarkTheme
              }
              onPress={handlePresentModalClose}
            >
              בטל
            </Button>
          </View>
        </BottomSheetModal>

        {/* <CustomBottomSheet ref={bottomSheetModalRef} /> */}
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
  sheetContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  panelTitle: {
    textAlign: "center",
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    textAlign: "center",
    color: "gray",
    fontSize: 14,
    height: 30,
    marginBottom: 10,
  },
  button: {
    marginBottom: 15,
  },
});
