import { ADDRESS } from "@env";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useMutation } from "@tanstack/react-query";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import Toast from "react-native-toast-message";

import { Color } from "../constants/colors";
import ErrorMessage from "../components/ui/ErrorMessage";
import Spacer from "../components/ui/Spacer";
import NavLink from "../components/NavLink";
import sendEmail from "../utils/sendEmail";

function ResetPasswordScreen({ route }) {
  const [otp, setOtp] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [isSecure1, setIsSecure1] = useState(true);
  const [isSecure2, setIsSecure2] = useState(true);

  const { email, uri, userType } = route.params;

  const resetPassword = async ({ otp, password, passwordConfirm }) => {
    try {
      const response = await fetch(
        `http://${ADDRESS}:3000/api/v1/students/resetPassword`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp, password, passwordConfirm }),
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

  const {
    mutate: mutateResetPassword,
    isPending: isResetPasswordPending,
    error: resetPasswordError,
    isError: isResetPasswordError,
  } = useMutation({
    mutationFn: ({ otp, password, passwordConfirm }) =>
      resetPassword({ otp, password, passwordConfirm }),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "סיסמה שונתה בהצלחה",
      });
    },
  });

  const { mutate: mutateSendEmail, isPending: isSendEmailPanding } =
    useMutation({
      mutationFn: ({ uri, email }) => sendEmail({ uri, email }),
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
    mutateResetPassword({ otp, password, passwordConfirm });
  };
  const handleSendEmail = () => {
    mutateSendEmail({ uri, email });
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
          textColor={Color.Brown900}
          onPress={handleSendEmail}
          loading={isSendEmailPanding}
        >
          {isSendEmailPanding ? "" : "שלח קוד מחדש"}
        </Button>

        <Text style={styles.text} variant="headlineMedium">
          מלא סיסמה חדשה
        </Text>
      </View>

      <View>
        <TextInput
          label="סיסמה"
          style={styles.textInput}
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
          style={styles.textInput}
          label="אשר סיסמה"
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

        {isResetPasswordError && (
          <ErrorMessage errorMessage={resetPasswordError.message} />
        )}

        <Spacer>
          <Button
            buttonColor={Color.Blue800}
            mode="contained"
            onPress={handleResetPassword}
            loading={isResetPasswordPending}
          >
            {isResetPasswordPending ? "" : "אפס סיסמה"}
          </Button>
        </Spacer>
        <NavLink text="התחבר" props={{ userType }} routeName="SignInScreen" />
      </View>
    </View>
  );
}

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 150,
  },
  text: {
    fontWeight: "bold",
    color: Color.Blue900,
  },
  otp: {
    width: "85%",
    height: 100,
  },
  underlineStyleBase: {
    color: Color.black,
    width: 40,
    height: 45,
    borderWidth: 1,
    borderBottomWidth: 4,
  },
  underlineStyleHighLighted: {
    borderColor: Color.Blue900,
  },
  textInput: {
    backgroundColor: "#fff",
    margin: 6,
    marginHorizontal: 10,
  },
});
