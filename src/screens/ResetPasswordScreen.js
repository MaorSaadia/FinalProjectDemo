import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useMutation } from "@tanstack/react-query";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import Clipboard from "@react-native-clipboard/clipboard";
import Toast from "react-native-toast-message";

import { Color } from "../constants/colors";
import ErrorMessage from "../components/ui/ErrorMessage";
import Spacer from "../components/ui/Spacer";
import NavLink from "../components/NavLink";
import PasswordInput from "../components/PasswordInput";
import sendEmail from "../api/sendEmail";
import resetPassword from "../api/authentication/resetPassword";

function ResetPasswordScreen({ route }) {
  const [otp, setOtp] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();

  const { email, uri, userType } = route.params;

  const {
    mutate: mutateResetPassword,
    isPending: isResetPasswordPending,
    error: resetPasswordError,
    isError: isResetPasswordError,
  } = useMutation({
    mutationFn: ({ userType, otp, password, passwordConfirm }) =>
      resetPassword({ userType, otp, password, passwordConfirm }),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "סיסמה שונתה בהצלחה",
      });
    },
  });

  const { mutate: mutateSendEmail, isPending: isSendEmailPanding } =
    useMutation({
      mutationFn: ({ userType, uri, email }) =>
        sendEmail({ userType, uri, email }),
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "קוד לאיפוס סיסמה נשלח למייל",
        });
      },
      onError: () => {
        Toast.show({
          type: "error",
          text1: "שגיאה בשליחת המייל",
        });
      },
    });

  const handleResetPassword = () => {
    mutateResetPassword({ userType, otp, password, passwordConfirm });
  };
  const handleSendEmail = () => {
    mutateSendEmail({ userType, uri, email });
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text} variant="headlineMedium">
          הכנס קוד אימות
        </Text>
        <OTPInputView
          style={styles.otp}
          pinCount={6}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(code) => {
            setOtp(code);
          }}
        />
        <Button
          mode="text"
          style={{ marginTop: -15 }}
          textColor={Color.Brown800}
          onPress={handleSendEmail}
          loading={isSendEmailPanding}
        >
          {isSendEmailPanding ? "" : "שלח קוד מחדש"}
        </Button>

        <Text style={styles.text} variant="headlineMedium">
          מלא סיסמה חדשה
        </Text>
      </View>

      <View style={styles.textInput}>
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
      </View>

      {isResetPasswordError && (
        <ErrorMessage errorMessage={resetPasswordError.message} />
      )}

      <Spacer>
        <Button
          style={{ marginHorizontal: 10 }}
          buttonColor={Color.Blue800}
          textColor={Color.defaultTheme}
          mode="contained"
          onPress={handleResetPassword}
          loading={isResetPasswordPending}
        >
          {!isResetPasswordPending && "אפס סיסמה    "}
        </Button>
      </Spacer>
      <NavLink
        text="התחבר    "
        props={{ userType }}
        routeName="SignInScreen"
        style={{ marginTop: -5, fontSize: 14 }}
      />
    </View>
  );
}

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 125,
  },
  text: {
    fontWeight: "bold",
    color: Color.Blue800,
  },
  otp: {
    width: "85%",
    height: 100,
  },
  underlineStyleBase: {
    color: Color.Blue800,
    width: 40,
    height: 45,
    borderWidth: 1,
    borderBottomWidth: 4,
  },
  underlineStyleHighLighted: {
    borderColor: Color.Blue900,
  },
  textInput: {
    margin: 6,
    marginHorizontal: 10,
  },
});
