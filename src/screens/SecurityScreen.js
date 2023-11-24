import { ADDRESS } from "@env";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useMutation } from "@tanstack/react-query";

import { useDarkMode } from "../context/DarkModeContext";
import { Color } from "../constants/colors";
import Spacer from "../components/ui/Spacer";
import NavLink from "../components/NavLink";

function SecurityScreen() {
  const { isDarkMode } = useDarkMode();

  const [currentPassword, setCurrentPassword] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [isSecure1, setIsSecure1] = useState(true);
  const [isSecure2, setIsSecure2] = useState(true);
  const [isSecure3, setIsSecure3] = useState(true);

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 15 }}>
        <Text style={styles.text} variant="headlineSmall">
          הזן סיסמה קיימת
        </Text>

        <TextInput
          label="סיסמה נוכחית"
          style={
            isDarkMode
              ? { ...styles.textInput, backgroundColor: Color.darkTheme }
              : { ...styles.textInput, backgroundColor: Color.defaultTheme }
          }
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
          onChangeText={(currentPassword) =>
            setCurrentPassword(currentPassword)
          }
          secureTextEntry={isSecure1}
        />
      </View>

      <Text style={styles.text} variant="headlineSmall">
        מלא סיסמה חדשה
      </Text>

      <TextInput
        label="סיסמה"
        style={
          isDarkMode
            ? { ...styles.textInput, backgroundColor: Color.darkTheme }
            : { ...styles.textInput, backgroundColor: Color.defaultTheme }
        }
        right={
          <TextInput.Icon
            icon={isSecure2 ? "eye" : "eye-off"}
            onPress={() => setIsSecure1(!isSecure2)}
          />
        }
        selectionColor={Color.Blue700}
        outlineColor={Color.Blue200}
        activeOutlineColor={Color.Blue800}
        mode="outlined"
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={isSecure2}
      />

      <TextInput
        style={
          isDarkMode
            ? { ...styles.textInput, backgroundColor: Color.darkTheme }
            : { ...styles.textInput, backgroundColor: Color.defaultTheme }
        }
        label="אשר סיסמה"
        right={
          <TextInput.Icon
            icon={isSecure3 ? "eye" : "eye-off"}
            onPress={() => setIsSecure2(!isSecure3)}
          />
        }
        selectionColor={Color.Blue700}
        outlineColor={Color.Blue200}
        activeOutlineColor={Color.Blue800}
        mode="outlined"
        onChangeText={(passwordConfirm) => setPasswordConfirm(passwordConfirm)}
        secureTextEntry={isSecure3}
      />

      <Spacer>
        <Button
          style={{ marginHorizontal: 10 }}
          buttonColor={Color.Blue800}
          textColor={Color.defaultTheme}
          mode="contained"
        >
          {"עדכן סיסמה"}
        </Button>
      </Spacer>
      {/* <NavLink text="חזור" routeName="StudentProfileScreen" /> */}
    </View>
  );
}

export default SecurityScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    color: Color.Blue800,
  },
  textInput: {
    margin: 6,
    marginHorizontal: 10,
  },
});
