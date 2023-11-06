import * as NavigationBar from "expo-navigation-bar";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Color } from "../constants/colors";
import HomeTabs from "./HomeTabs";
import CustomDrawer from "../components/CustomDrawer";
import Ionicons from "react-native-vector-icons/Ionicons";

const Drawer = createDrawerNavigator();

function HomeDrawer() {
  NavigationBar.setVisibilityAsync("hidden");

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: Color.Brown100 },
        drawerContentStyle: { backgroundColor: Color.Blue100 },
        headerTitle: "",
        drawerActiveTintColor: Color.black,
        drawerInactiveTintColor: Color.black,
        drawerActiveBackgroundColor: Color.Brown50,
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
    </Drawer.Navigator>
  );
}

export default HomeDrawer;