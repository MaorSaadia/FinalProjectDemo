import * as NavigationBar from "expo-navigation-bar";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useDarkMode } from "../context/DarkModeContext";
import { Color } from "../constants/colors";
import CustomDrawer from "../components/CustomDrawer";
import HomeTabs from "./HomeTabs";
import StudentProfileScreen from "../screens/StudentProfileScreen";

const Drawer = createDrawerNavigator();

function HomeDrawer({ navigation }) {
  // NavigationBar.setVisibilityAsync("hidden");
  const { isDarkMode } = useDarkMode();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
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
      <Drawer.Screen
        name="בית"
        component={HomeTabs}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="פרופיל"
        component={StudentProfileScreen}
        options={{
          headerRight: () => (
            <MaterialCommunityIcons.Button
              backgroundColor={isDarkMode ? Color.Brown700 : Color.Brown100}
              name="account-edit"
              size={25}
              color={Color.darkTheme}
              onPress={() => navigation.navigate("EditStudentProfileScreen")}
            />
          ),
          drawerIcon: ({ color }) => (
            <Ionicons name="list" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default HomeDrawer;
