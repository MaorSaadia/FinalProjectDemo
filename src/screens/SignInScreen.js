import { ADDRESS } from "@env";
import { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Color } from "../constants/colors";
import Input from "../components/Input";
import NavLink from "../components/NavLink";
import { StudentContext } from "../context/StudentContext";

function SignInScreen({ route }) {
  const auth = useContext(StudentContext);
  const navigation = useNavigation();

  const { userType } = route.params;

  const [isSecure, setIsSecure] = useState(true);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (err) {
      console.log(err);
    }
  };

  const login = async ({ email, password }) => {
    try {
      const response = await fetch(
        `http://${ADDRESS}:3000/api/v1/students/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    } catch (error) {
      throw new Error("Failed to fetch");
    }
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (user) => {
      storeData("token", user.token);
      auth.login(user.data);
      // storeData("id", user.data.user._id);
      navigation.navigate("HomeDrawer");
    },
    onError: (err) => {
      console.log("ERROR", err);
    },
  });

  const handleLogin = () => {
    mutate({ email, password });
  };

  return (
    <ImageBackground
      source={require("../../assets/images/Zinc.jpg")}
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
          label="מייל"
          mode="outlined"
          onValueChange={(selectedMail) => setEmail(selectedMail)}
        />
        <TextInput
          label="סיסמה"
          style={{ backgroundColor: "#fff" }}
          right={
            <TextInput.Icon
              icon={isSecure ? "eye" : "eye-off"}
              onPress={() => setIsSecure(!isSecure)}
            />
          }
          selectionColor={Color.Blue700}
          outlineColor={Color.Blue200}
          activeOutlineColor={Color.Blue800}
          mode="outlined"
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={isSecure}
        />
        {userType === "student" ? (
          <NavLink
            text="אין לך חשבון? לחץ כאן להירשם במקום"
            props={{ userType: userType }}
            routeName="StudentsSignUpScreen"
          />
        ) : (
          <NavLink
            text="אין לך חשבון? לחץ כאן להירשם במקום"
            props={{ userType: userType }}
            routeName="LandlordSignUpScreen"
          />
        )}
        <Button
          icon="login"
          buttonColor={Color.Blue800}
          mode="contained"
          onPress={handleLogin}
        >
          התחבר
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
