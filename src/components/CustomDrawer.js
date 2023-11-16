import { useContext, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Switch } from "react-native-paper";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Color } from "../constants/colors";
import { StudentContext, useStudents } from "../context/StudentContext";

async function logoutHandler(auth, navigation) {
  try {
    await AsyncStorage.removeItem("token");
    auth.logout();
    navigation.navigate("WelcomeScreen");
  } catch (err) {
    console.log(err);
  }
}

function CustomDrawer(props) {
  const auth = useContext(StudentContext);
  const { context } = useStudents();
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        style={{ backgroundColor: Color.darkTheme }}
        {...props}
        contentContainerStyle={{ backgroundColor: Color.Blue200 }}
      >
        <View style={{ padding: 20, backgroundColor: Color.Blue200 }}>
          <Text
            style={{
              color: Color.black,
              fontSize: 18,
            }}
          >
            {context.name}
          </Text>
        </View>
        <View
          style={{ flex: 1, backgroundColor: Color.darkTheme, paddingTop: 12 }}
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View
        style={{
          padding: 10,
          backgroundColor: Color.darkTheme,
          borderTopWidth: 1,
          borderTopColor: Color.Brown100,
        }}
      >
        <View
          style={{
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Switch value={true} color={Color.Brown400} />
          <Text
            style={{
              fontSize: 15,
              marginLeft: 5,
              color: Color.white,
            }}
          >
            מצב כהה
          </Text>
        </View>
      </View>

      <View
        style={{
          padding: 15,
          borderTopWidth: 2,
          borderTopColor: Color.Brown300,
          backgroundColor: Color.Blue200,
        }}
      >
        <TouchableOpacity
          onPress={() => logoutHandler(auth, navigation)}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}
            >
              התנתק
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CustomDrawer;
