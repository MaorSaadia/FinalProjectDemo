import { ADDRESS } from "@env";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { Avatar, Title, Text, TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useDarkMode } from "../context/DarkModeContext";
import { Color } from "../constants/colors";
import { StudentContext, useStudents } from "../context/StudentContext";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";

const StudentProfileScreen = () => {
  const { isDarkMode } = useDarkMode();
  const { context } = useStudents();
  const auth = useContext(StudentContext);
  const navigation = useNavigation();

  const fetchStudents = async () => {
    try {
      const response = await fetch(
        `https://finalprojectserver0-5.onrender.com/api/v1/students/${context.id}`
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

  const { error, isLoading } = useQuery({
    queryKey: ["student"],
    queryFn: fetchStudents,
  });

  if (isLoading) {
    return <Loader color={Color.Brown500} />;
  }

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  async function logoutHandler(auth, navigation) {
    try {
      await AsyncStorage.removeItem("token");
      auth.logout();
      navigation.navigate("WelcomeScreen");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={styles.avatar}>
          <Avatar.Image
            style={{
              backgroundColor: isDarkMode
                ? Color.darkTheme
                : Color.defaultTheme,
            }}
            source={{
              uri: context.avatar?.url,
            }}
            size={80}
          />
          <View>
            <Title style={styles.title}>{context.name}</Title>
          </View>
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoTitle}>חשבון</Text>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius-outline" color={Color.icon} size={20} />
          <Text style={styles.text}>{context.academic}</Text>
        </View>

        <View style={styles.row}>
          <Icon name="school-outline" color={Color.icon} size={20} />
          <Text style={styles.text}>{context.department}</Text>
        </View>

        <View style={styles.row}>
          <Icon name="calendar-blank-outline" color={Color.icon} size={20} />
          <Text style={styles.text}>{context.yearbook}</Text>
        </View>

        <View style={styles.row}>
          <Icon name="email-outline" color={Color.icon} size={20} />
          <Text style={styles.text}>{context.email}</Text>
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoTitle}>אחר</Text>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color={Color.icon} size={25} />
            <Text style={styles.menuItemText}>מועדפים</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => navigation.navigate("SecurityScreen")}>
          <View style={styles.menuItem}>
            <Icon name="shield-lock-outline" color={Color.icon} size={25} />
            <Text style={styles.menuItemText}>אבטחה</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => logoutHandler(auth, navigation)}>
          <View style={styles.menuItem}>
            <Icon name="logout-variant" color={Color.icon} size={25} />
            <Text style={styles.menuItemText}>התנתק</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default StudentProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  avatar: {
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: "bold",
  },
  info: {
    marginBottom: 20,
    marginHorizontal: 30,
    marginTop: -20,
    borderBottomWidth: 0.6,
    borderColor: Color.Blue500,
  },
  infoTitle: {
    fontWeight: "800",
    fontSize: 15,
    color: Color.Blue900,
    marginBottom: 5,
  },
  text: {
    color: Color.icon,
    marginLeft: 20,
    fontFamily: "varelaRound",
  },

  row: {
    flexDirection: "row",
    marginBottom: 10,
  },

  menuWrapper: {
    marginTop: -15,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: Color.icon,
    marginLeft: 10,
    fontSize: 16,
    fontFamily: "varelaRound",
  },
});
