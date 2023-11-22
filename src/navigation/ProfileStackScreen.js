import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Color } from "../constants/colors";
import { useDarkMode } from "../context/DarkModeContext";
import StudentProfileScreen from "../screens/StudentProfileScreen";
import EditStudentProfileScreen from "../screens/EditStudentProfileScreen";
import { View } from "react-native";

const ProfileStack = createNativeStackNavigator();

function ProfileStackScreen({ navigation }) {
  const { isDarkMode } = useDarkMode();
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? Color.Brown700 : Color.Brown100,
        },
        drawerContentStyle: {
          backgroundColor: isDarkMode ? Color.darkTheme : Color.defaultTheme,
        },
        headerTitle: "",
        drawerActiveTintColor: !isDarkMode
          ? Color.darkTheme
          : Color.defaultTheme,
        drawerInactiveTintColor: !isDarkMode
          ? Color.darkTheme
          : Color.defaultTheme,
        drawerActiveBackgroundColor: Color.Brown400,
        drawerLabelStyle: {
          marginLeft: -20,
          fontSize: 15,
        },
      }}
    >
      <ProfileStack.Screen
        name="פרופיל"
        component={StudentProfileScreen}
        options={{
          title: "",
          headerRight: () => (
            <View style={{ marginLeft: -10 }}>
              <Ionicons.Button
                name="ios-menu"
                size={25}
                color={Color.darkTheme}
                backgroundColor={isDarkMode ? Color.Brown700 : Color.Brown100}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          headerLeft: () => (
            <View style={{ marginRight: -10 }}>
              <MaterialCommunityIcons.Button
                name="account-edit"
                size={25}
                color={Color.darkTheme}
                backgroundColor={isDarkMode ? Color.Brown700 : Color.Brown100}
                onPress={() => navigation.navigate("EditStudentProfileScreen")}
              />
            </View>
          ),
        }}
      />
      <ProfileStack.Screen
        name="EditStudentProfileScreen"
        component={EditStudentProfileScreen}
      />
    </ProfileStack.Navigator>
  );
}

export default ProfileStackScreen;
