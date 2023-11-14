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

function ResetPasswordScreen() {
  const [otp, setOtp] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [isSecure1, setIsSecure1] = useState(true);
  const [isSecure2, setIsSecure2] = useState(true);

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

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: ({ otp, password, passwordConfirm }) =>
      resetPassword({ otp, password, passwordConfirm }),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "סיסמה אופסה בהצלחה",
      });
    },
  });

  const handleResetPassword = () => {
    mutate({ otp, password, passwordConfirm });
  };

  return (
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
      <Text style={styles.text} variant="headlineMedium">
        מלא סיסמה חדשה
      </Text>
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

        <Spacer>
          <Button
            style={{ marginHorizontal: -100 }}
            buttonColor={Color.Blue800}
            mode="contained"
            onPress={handleResetPassword}
            loading={isPending}
          >
            {isPending ? "" : "אפס סיסמה"}
          </Button>
        </Spacer>
        <NavLink
          text="חזור לעמוד התחברות"
          props={{ userType: "student" }}
          routeName="SignInScreen"
        />
      </View>
      {isError && <ErrorMessage errorMessage={error.message} />}
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
    marginHorizontal: -100,
    margin: 5,
  },
});
