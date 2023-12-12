import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { Color } from "../../constants/colors";
import { useDarkMode } from "../../context/DarkModeContext";

function Bubble({ text, type }) {
  const { isDarkMode } = useDarkMode();
  const bubbleStyle = { ...styles.container };
  const textStyle = { ...styles.text };
  const wrapperStyle = { ...styles.wrapperStyle };

  switch (type) {
    case "system":
      textStyle.color = isDarkMode ? Color.white : Color.black;
      bubbleStyle.backgroundColor = Color.Brown300;
      bubbleStyle.alignItems = "center";
      bubbleStyle.marginTop = 12;
      bubbleStyle.opacity = 0.6;
      break;
    case "error":
      bubbleStyle.backgroundColor = Color.error;
      textStyle.color = Color.errorText;
      bubbleStyle.marginTop = 10;
      break;
    case "myMessage":
      wrapperStyle.justifyContent = "flex-end";
      bubbleStyle.backgroundColor = Color.Blue700;
      bubbleStyle.borderBottomRightRadius = 15;
      bubbleStyle.maxWidth = "90%";
      break;
    case "theirMessage":
      wrapperStyle.justifyContent = "flex-start";
      bubbleStyle.backgroundColor = isDarkMode ? Color.darkTheme : Color.white;
      bubbleStyle.borderBottomLeftRadius = 15;
      bubbleStyle.maxWidth = "90%";
      break;
    default:
      break;
  }

  return (
    <View style={wrapperStyle}>
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
    padding: 7,
    marginBottom: 10,
  },
  text: {
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});

export default Bubble;
