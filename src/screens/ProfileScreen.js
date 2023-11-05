import { ADDRESS } from "@env";
import { useQuery } from "@tanstack/react-query";
import { View } from "react-native";
import { Text } from "react-native-paper";
import Loader from "../components/ui/Loader";

function ProfileScreen() {
  const fetchStudents = async () => {
    try {
      const response = await fetch(`http://${ADDRESS}:3000/api/v1/students`);
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

  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
}

export default ProfileScreen;
