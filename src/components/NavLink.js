import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import Spacer from "./ui/Spacer";
import { useNavigation } from "@react-navigation/native";
import { Color } from "../constants/colors";

const NavLink = ({ text, routeName, props }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName, { props })}>
      <Spacer>
        <Text style={styles.link}>{text}</Text>
      </Spacer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: Color.Blue900,
    fontSize: 16,
  },
});

export default NavLink;
