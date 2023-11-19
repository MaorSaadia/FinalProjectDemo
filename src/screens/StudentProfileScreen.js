import { ADDRESS } from "@env";
import { useQuery } from "@tanstack/react-query";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { Avatar, Title, Text, TouchableRipple } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Color } from "../constants/colors";
import { useStudents } from "../context/StudentContext";
import Loader from "../components/ui/Loader";

const StudentProfileScreen = () => {
  const { context } = useStudents();

  const id = context.id?.toString();

  const fetchStudents = async () => {
    try {
      const response = await fetch(
        `http://${ADDRESS}:3000/api/v1/students/${id}`
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
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={styles.avatar}>
          <Avatar.Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVjV46oIcT3biDGOJ5FtLlIXqPO_xRlWL2VA&usqp=CAU",
            }}
            size={80}
          />
          <View>
            <Title style={styles.title}>{context.name}</Title>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius-outline" color="#777777" size={20} />
          <Text style={styles.text}>{context.academic}</Text>
        </View>

        <View style={styles.row}>
          <Icon name="school-outline" color="#777777" size={20} />
          <Text style={styles.text}>{context.department}</Text>
        </View>

        <View style={styles.row}>
          <Icon name="calendar-blank-outline" color="#777777" size={20} />
          <Text style={styles.text}>{context.yearbook}</Text>
        </View>

        <View style={styles.row}>
          <Icon name="email-outline" color="#777777" size={20} />
          <Text style={styles.text}>{context.email}</Text>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color={Color.Blue800} size={25} />
            <Text style={styles.menuItemText}>מועדפים</Text>
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
  text: {
    color: "#777777",
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
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 10,
    fontWeight: "600",
    fontSize: 16,
  },
});
