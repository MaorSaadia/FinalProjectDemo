import { useContext } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { Avatar, Title, Text, TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useDarkMode } from "../context/DarkModeContext";
import { Color } from "../constants/colors";
import { StudentContext, useStudents } from "../context/StudentContext";

const StudentProfileScreen = () => {
  const { isDarkMode } = useDarkMode();
  const { context } = useStudents();
  const auth = useContext(StudentContext);
  const navigation = useNavigation();

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
