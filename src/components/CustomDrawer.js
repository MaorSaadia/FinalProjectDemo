import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Color } from "../constants/colors";

const CustomDrawer = (props) => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
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
            מאור
          </Text>
        </View>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 12 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          padding: 15,
          borderTopWidth: 2,
          borderTopColor: Color.Brown300,
          backgroundColor: Color.Blue200,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("WelcomeScreen");
          }}
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
};

export default CustomDrawer;
