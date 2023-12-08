import { StyleSheet, Text, View } from "react-native";

import { Color } from "../constants/colors";
import { useDarkMode } from "../context/DarkModeContext";

function Bubble({ text, type }) {
  const { isDarkMode } = useDarkMode();
  const bubbleStyle = { ...styles.container };
  const textStyle = { ...styles.text };

  switch (type) {
    case "system":
      textStyle.color = isDarkMode ? Color.white : Color.darkTheme;
      bubbleStyle.backgroundColor = Color.Brown300;
      bubbleStyle.alignItems = "center";
      bubbleStyle.marginTop = 12;
      break;
    default:
      break;
  }

  return (
    <View style={styles.wrapperStyle}>
      <View style={bubbleStyle}>
        <Text style={textStyle}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperStyle: {
    flexDirection: "row",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "white",
    borderRadius: 6,
    padding: 5,
    marginBottom: 10,
    borderColor: Color.Brown500,
    borderWidth: 1,
  },
  text: {
    fontFamily: "regular",
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});

export default Bubble;
