import { ADDRESS } from "@env";
import { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import Input from "../components/Input";
import Spacer from "../components/ui/Spacer";
import { Color } from "../constants/colors";
import ErrorMessage from "../components/ui/ErrorMessage";
import sendEmail from "../utils/sendEmail";
import { useDarkMode } from "../context/DarkModeContext";

function ForgotPasswordScreen({ route }) {
  const navigation = useNavigation();
  const { isDarkMode } = useDarkMode();

  const [email, setEmail] = useState();
  const { userType } = route.params;
  const uri = "students/forgotPassword";

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: ({ uri, email }) => sendEmail({ uri, email }),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "קוד לאיפוס סיסמה נשלח למייל",
      });
      navigation.navigate("ResetPasswordScreen", { email, uri, userType });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "שגיאה בשליחת המייל",
      });
    },
  });

  const handleSendEmail = () => {
    mutate({ uri, email });
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
        <Text style={styles.text} variant="titleMedium">
          אנא הזן מייל לקבלת לינק לאיפוס סיסמה
        </Text>
        <View style={styles.line} />
        <Spacer>
          <Input
            label="אימייל"
            mode="outlined"
            onValueChange={(selectedMail) => setEmail(selectedMail)}
          />
        </Spacer>

        <View style={styles.line} />

        {isError && <ErrorMessage errorMessage={error.message} />}

        <Button
          style={styles.button}
          buttonColor={Color.Brown500}
          onPress={handleSendEmail}
          loading={isPending}
          mode="contained"
        >
          {isPending ? "" : "שלח"}
        </Button>
      </View>
    </ImageBackground>
  );
}

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  image: {
    flex: 1,
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
    color: Color.Brown800,
  },
  line: {
    height: 3,
    backgroundColor: Color.Brown500,
    marginTop: 10,
  },
  button: {
    margin: 15,
  },
});
