import React from "react";
import { View, Text, StyleSheet } from "react-native";

function ErrorMessage({ errorMessage }) {
  // Remove "Error:" from the beginning of the error message
  const message = errorMessage.replace(/^Error:\s*/i, "");

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8d7da",
    padding: 10,
    borderRadius: 5,
    borderColor: "#f5c6cb",
    borderWidth: 1,
    marginTop: 10,
    marginHorizontal: 10,
  },
  text: {
    color: "#721c24",
    fontSize: 16,
  },
});

export default ErrorMessage;
