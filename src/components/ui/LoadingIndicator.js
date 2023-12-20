import { MotiView } from "moti";
import { StyleSheet, View } from "react-native";

import { Color } from "../../constants/colors";

function LoadingIndicator({ size }) {
  return (
    <View style={styles.container}>
      <MotiView
        from={{
          width: size,
          height: size,
          borderRadius: size / 2,
        }}
        animate={{
          width: size + 20,
          height: size + 20,
          borderRadius: (size + 20) / 2,
        }}
        transition={{
          type: "timing",
          duration: 1000,
          loop: true,
        }}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: size / 10,
          borderColor: Color.Brown500,
        }}
      />
    </View>
  );
}

export default LoadingIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
