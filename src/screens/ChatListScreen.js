import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

import { Color } from "../constants/colors";

function ChatListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>ChatListScreen</Text>
      <Button
        buttonColor={Color.Brown500}
        textColor={Color.white}
        mode="elevated"
        onPress={() => navigation.navigate("ChatScreen")}
      >
        עבור לצאט
      </Button>
    </View>
  );
}

export default ChatListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
