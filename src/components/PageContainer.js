import { StyleSheet, View } from "react-native";

function PageContainer({ style, children }) {
  return <View style={{ ...styles.container, ...style }}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "white",
  },
});

export default PageContainer;
