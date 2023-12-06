import { ADDRESS } from "@env";
import {
  useCallback,
  useContext,
  useEffect,
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
import { Button, Text, TextInput } from "react-native-paper";
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
import NavLink from "../components/NavLink";

function EditStudentProfileScreen() {
  const { isDarkMode } = useDarkMode();
  const { context } = useStudents();
  const auth = useContext(StudentContext);
  const navigation = useNavigation();

  const { token } = context;
  const userType = "student";
  const [avatar, setAvatar] = useState(context.avatar?.url);
  const [name, setName] = useState(context.name);
  const [age, setAge] = useState(context.age);
  const [academic, setAcademic] = useState(context.academic);
  const [department, setDepartment] = useState(context.department);
  const [yearbook, setYearbook] = useState(context.yearbook);
  const [email, setEmail] = useState(context.email);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const url =
    "https://res.cloudinary.com/dtkpp77xw/image/upload/v1701189732/default_nk5c5h.png";

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

  useEffect(() => {
    if (avatar !== context.avatar?.url) {
      handlePresentModalClose();
    }
  }, [avatar]);

  const updateMe = async ({
    userType,
    avatar,
    name,
    age,
    academic,
    department,
    yearbook,
    email,
  }) => {
    try {
      const formData = new FormData();

      formData.append("userType", userType);
      formData.append("name", name);
      formData.append("age", age);
      formData.append("academic", academic);
      formData.append("department", department);
      formData.append("yearbook", yearbook);
      formData.append("email", email);

      if (avatar) {
        const localUri = avatar;
        const filename = localUri.split("/").pop();

        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : "image";

        formData.append("avatar", {
          uri: localUri,
          name: filename,
          type,
        });
      }

      const response = await fetch(
        `https://finalprojectserver0-5.onrender.com/api/v1/students/updateMe`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
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
      userType,
      avatar,
      name,
      age,
      academic,
      department,
      yearbook,
      email,
    }) =>
      updateMe({
        userType,
        avatar,
        name,
        age,
        academic,
        department,
        yearbook,
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
  });

  const handleUpdateMe = () => {
    mutate({
      userType,
      avatar,
      name,
      age,
      academic,
      department,
      yearbook,
      email,
    });
  };

  const bottomSheetModalRef = useRef(null);

  // const snapPoints = useMemo(() => ["20%", "40%", "60%", "80%"], []);
  const snapPoints = useMemo(() => ["40%", "60%"], []);

  const handlePresentModalOpen = useCallback(() => {
    bottomSheetModalRef.current?.present();
    setIsBottomSheetOpen(true);
  }, []);

  const handlePresentModalClose = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    setIsBottomSheetOpen(false);
  }, []);

  return (
    <ScrollView>
      <View
        style={
          isBottomSheetOpen
            ? { ...styles.container, opacity: 0.3 }
            : styles.container
        }
      >
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={
              isBottomSheetOpen
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
                  backgroundColor: isDarkMode ? Color.darkTheme : Color.white,
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
              style={{ marginTop: 45 }}
              textColor={Color.defaultTheme}
              buttonColor={Color.Blue800}
              mode="contained"
              onPress={handleUpdateMe}
              loading={isPending}
            >
              {!isPending && "עדכן    "}
            </Button>
          </Spacer>
          <NavLink text="חזור    " style={{ marginTop: -5, fontSize: 14 }} />
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
          onDismiss={() => setIsBottomSheetOpen(false)}
        >
          <View style={styles.sheetContainer}>
            <Text style={styles.panelTitle}>עדכן תמונה</Text>
            <Text style={styles.panelSubtitle}>בחר את תמונת הפרופיל שלך</Text>

            <ImagePicker onPickImage={(image) => setAvatar(image)} />
            <TakePhoto onTakeImage={(image) => setAvatar(image)} />

            <Button
              style={styles.button}
              textColor={
                isDarkMode ? Color.buttomSheetDarkTheme : Color.defaultTheme
              }
              buttonColor={
                isDarkMode ? Color.defaultTheme : Color.buttomSheetDarkTheme
              }
              mode="contained"
              onPress={() => setAvatar(url)}
            >
              מחק תמונה
            </Button>

            <Button
              style={{ marginTop: -15 }}
              onPress={handlePresentModalClose}
              mode="text"
              textColor={
                isDarkMode ? Color.defaultTheme : Color.buttomSheetDarkTheme
              }
            >
              בטל
            </Button>
          </View>
        </BottomSheetModal>
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
