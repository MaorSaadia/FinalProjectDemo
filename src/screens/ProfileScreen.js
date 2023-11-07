import { ADDRESS } from "@env";
import { useQuery } from "@tanstack/react-query";
import { View } from "react-native";
import { Text } from "react-native-paper";
import Loader from "../components/ui/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Color } from "../constants/colors";

function ProfileScreen() {
  const fetchStudents = async () => {
    try {
      const user = await AsyncStorage.getItem("id");
      const response = await fetch(
        `http://${ADDRESS}:3000/api/v1/students/${user}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    } catch (error) {
      throw new Error("Failed to fetch");
    }
  };

  const {
    data: students,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["student"],
    queryFn: fetchStudents,
  });

  if (isLoading) {
    return <Loader color={Color.Blue500} size="large" />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>; // Handle error case
  }

  return (
    <View>
      <Text>{students.data.name}</Text>
    </View>
  );
}

export default ProfileScreen;
