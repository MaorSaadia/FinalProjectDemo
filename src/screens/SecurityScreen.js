import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useMutation } from "@tanstack/react-query";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";

import { useStudents } from "../context/StudentContext";
import { Color } from "../constants/colors";
import Spacer from "../components/ui/Spacer";
import PasswordInput from "../components/PasswordInput";
import ErrorMessage from "../components/ui/ErrorMessage";
import NavLink from "../components/NavLink";
import changePassword from "../api/authentication/changePassword";

function SecurityScreen() {
  const { context } = useStudents();
  const token = context.token;

  const userType = "student";
  const [passwordCurrent, setPasswordCurrent] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({
      userType,
      passwordCurrent,
      password,
      passwordConfirm,
      token,
    }) =>
      changePassword({
        userType,
        passwordCurrent,
        password,
        passwordConfirm,
        token,
      }),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "סיסמה חדשה עודכנה בהצלחה",
      });
    },
  });

  const handleChangePassword = () => {
    mutate({ userType, passwordCurrent, password, passwordConfirm, token });
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Text style={styles.title} variant="headlineSmall">
          החלף סיסמה
        </Text>
        <View style={{ marginTop: 25 }}>
          <Text style={styles.text} variant="titleMedium">
            הזן סיסמה נוכחית:
          </Text>

          <PasswordInput
            mode="outlined"
            onValueChange={(passwordCurrent) =>
              setPasswordCurrent(passwordCurrent)
            }
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.text} variant="titleMedium">
            מלא סיסמה חדשה:
          </Text>
        </View>
        <PasswordInput
          mode="outlined"
          onValueChange={(password) => setPassword(password)}
        />
        <Text style={styles.text} variant="titleMedium">
          אשר סיסמה:
        </Text>
        <PasswordInput
          mode="outlined"
          onValueChange={(passwordConfirm) =>
            setPasswordConfirm(passwordConfirm)
          }
        />
        {isError && <ErrorMessage errorMessage={error.message} />}
        <Spacer>
          <Button
            style={{ marginTop: 10 }}
            buttonColor={Color.Blue800}
            textColor={Color.defaultTheme}
            mode="contained"
            loading={isPending}
            onPress={handleChangePassword}
          >
            {!isPending && "עדכן סיסמה    "}
          </Button>
        </Spacer>
        <NavLink text="חזור    " style={{ marginTop: -5, fontSize: 14 }} />
      </View>
    </KeyboardAwareScrollView>
  );
}

export default SecurityScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    marginHorizontal: 10,
  },
  title: {
    margin: 25,
    textAlign: "center",
    fontWeight: "bold",
    borderBottomWidth: 0.4,
    borderBottomColor: Color.Blue500,
    color: Color.Blue900,
  },
  text: {
    marginHorizontal: 10,
    marginBottom: 5,
    fontWeight: "bold",
    color: Color.Blue700,
  },
});
