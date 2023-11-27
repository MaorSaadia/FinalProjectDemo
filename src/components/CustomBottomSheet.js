import React, { forwardRef, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

// export const Ref = BottomSheetModal;

function CustomBottomSheet(ref) {
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

  return (
    <BottomSheetModal ref={ref} snapPoints={snapPoints}>
      <View style={styles.contentContainer}>
        <Text>Hello</Text>
      </View>
    </BottomSheetModal>
  );
}

export default forwardRef < Ref > CustomBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
