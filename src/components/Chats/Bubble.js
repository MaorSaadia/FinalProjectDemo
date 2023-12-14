import { useRef } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-paper";
import { Menu, MenuTrigger, MenuOptions } from "react-native-popup-menu";
import uuid from "react-native-uuid";
import * as Clipboard from "expo-clipboard";

import { Color } from "../../constants/colors";
import { useDarkMode } from "../../context/DarkModeContext";
import MenuItem from "./MenuItem";

function Bubble({ text, type, time }) {
  const { isDarkMode } = useDarkMode();

  const bubbleStyle = { ...styles.container };
  const textStyle = { ...styles.text };
  const wrapperStyle = { ...styles.wrapperStyle };
  const timeStyle = { ...styles.timeStyle };

  const menuRef = useRef(null);
  const id = useRef(uuid.v4());
  let Container = View;

  const copyToClipboard = async (text) => {
    try {
      await Clipboard.setStringAsync(text);
    } catch (err) {
      console.log(err.message);
    }
  };

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
      Container = TouchableWithoutFeedback;
      break;
    case "theirMessage":
      wrapperStyle.justifyContent = "flex-start";
      bubbleStyle.backgroundColor = isDarkMode ? Color.darkTheme : Color.white;
      bubbleStyle.borderBottomLeftRadius = 15;
      bubbleStyle.maxWidth = "90%";
      timeStyle.color = isDarkMode ? Color.Blue100 : Color.Brown900;
      Container = TouchableWithoutFeedback;
      break;
    default:
      break;
  }

  return (
    <View style={wrapperStyle}>
      <Container
        onLongPress={() =>
          menuRef.current.props.ctx.menuActions.openMenu(id.current)
        }
        style={{ width: "100%" }}
      >
        <View style={bubbleStyle}>
          <Text style={textStyle}>{text}</Text>
          <View style={styles.timeContainer}>
            <Text style={timeStyle}>{time}</Text>
          </View>
          <Menu name={id.current} ref={menuRef}>
            <MenuTrigger />
            <MenuOptions
              customStyles={{ optionsContainer: { width: 130 } }}
              optionsContainerStyle={{
                backgroundColor: isDarkMode ? Color.darkTheme : Color.white,
              }}
            >
              <MenuItem
                text="העתק ללוח"
                icon={"copy"}
                onSelect={() => copyToClipboard(text)}
              />
            </MenuOptions>
          </Menu>
        </View>
      </Container>
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
    fontSize: 16,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  timeStyle: {
    fontFamily: "varelaRound",
    letterSpacing: 0.3,
    fontSize: 9,
    color: Color.Brown100,
  },
});

export default Bubble;
