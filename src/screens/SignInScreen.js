import { ADDRESS } from "@env";
import { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useDarkMode } from "../context/DarkModeContext";
import { StudentContext } from "../context/StudentContext";
import { Color } from "../constants/colors";
import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";
import NavLink from "../components/NavLink";
import ErrorMessage from "../components/ui/ErrorMessage";

function SignInScreen({ route }) {
  const auth = useContext(StudentContext);
  const { isDarkMode } = useDarkMode();
  const navigation = useNavigation();

  const { userType } = route.params;

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (err) {
      console.log(err);
    }
  };

  const login = async ({ userType, email, password }) => {
    try {
      const response = await fetch(
        `http://${ADDRESS}:3000/api/v1/students/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userType, email, password }),
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

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: ({ userType, email, password }) =>
      login({ userType, email, password }),
    onSuccess: (user) => {
      storeData("token", user.token);
      auth.login(user.data.user, user.token);
      navigation.navigate("HomeDrawer");
    },
  });

  const handleLogin = () => {
    mutate({ userType, email, password });
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
      <View style={styles.container}>
        <View style={styles.text}>
          <Text variant="displaySmall" style={{ color: Color.Blue800 }}>
            ─── התחברות ───
          </Text>
        </View>

        <Input
          label="אימייל"
          keyboardType="email-address"
          mode="outlined"
          onValueChange={(selectedMail) => setEmail(selectedMail)}
        />

        <PasswordInput
          mode="outlined"
          label="סיסמה"
          onValueChange={(password) => setPassword(password)}
        />

        {isError && <ErrorMessage errorMessage={error.message} />}

        <NavLink
          text="שכחתי סיסמה"
          routeName="ForgotPasswordScreen"
          props={{ userType: userType }}
        />

        {userType === "student" ? (
          <NavLink
            text="אין לך חשבון? לחץ כאן להירשם "
            props={{ userType: userType }}
            routeName="StudentsSignUpScreen"
          />
        ) : (
          <NavLink
            text="אין לך חשבון? לחץ כאן להירשם "
            props={{ userType: userType }}
            routeName="LandlordSignUpScreen"
          />
        )}

        <Button
          buttonColor={Color.Blue800}
          textColor={Color.defaultTheme}
          mode="contained"
          onPress={handleLogin}
          loading={isPending}
        >
          {isPending ? "" : "התחבר"}
        </Button>
      </View>
    </ImageBackground>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
  },
  image: {
    flex: 1,
  },
  text: {
    alignItems: "center",
  },
});
