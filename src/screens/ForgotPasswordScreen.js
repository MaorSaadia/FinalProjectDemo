import { ADDRESS } from "@env";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useMutation } from "@tanstack/react-query";

import Input from "../components/Input";
import Spacer from "../components/ui/Spacer";
import { Color } from "../constants/colors";
import ErrorMessage from "../components/ui/ErrorMessage";
import Toast from "react-native-toast-message";

function ForgotPasswordScreen() {
  const [email, setEmail] = useState();

  const sendEmail = async ({ email }) => {
    try {
      const response = await fetch(
        `http://${ADDRESS}:3000/api/v1/students/forgotPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
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
    mutationFn: ({ email }) => sendEmail({ email }),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "מייל נשלח בהצלחה",
      });
    },
  });

  const handleSendEmail = () => {
    mutate({ email });
  };

  return (
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
  );
}

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
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
