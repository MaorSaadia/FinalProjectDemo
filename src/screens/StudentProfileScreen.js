import { ADDRESS } from "@env";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { Avatar, Title, Text, TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Color } from "../constants/colors";
import { useStudents } from "../context/StudentContext";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";

const StudentProfileScreen = () => {
  const { context } = useStudents();
  const navigation = useNavigation();

  const [image, setImage] = useState(
    "https://img.myloview.cz/nalepky/default-avatar-profile-icon-vector-social-media-user-image-700-205124837.jpg"
  );
  const fetchStudents = async () => {
    try {
      const response = await fetch(
        `http://${ADDRESS}:3000/api/v1/students/${context.id}`
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
    return (
      <View style={{ alignItems: "center" }}>
        <ErrorMessage errorMessage={error.message} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={styles.avatar}>
          <Avatar.Image
            source={{
              uri: image,
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
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
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
    fontWeight: "600",
    fontSize: 16,
  },
});
