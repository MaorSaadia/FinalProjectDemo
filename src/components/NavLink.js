import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Color } from "../constants/colors";
import Spacer from "./ui/Spacer";

const NavLink = ({ text, routeName, props, style }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        routeName ? navigation.navigate(routeName, props) : navigation.goBack()
      }
    >
      <Spacer>
        <Text style={{ ...styles.link, ...style }}>{text}</Text>
      </Spacer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: Color.Blue800,
    fontSize: 16,
    textAlign: "center",
  },
});

export default NavLink;
