import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { Color } from "../constants/colors";
import { useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";

function Input({
  label,
  mode,
  keyboardType,
  maxLength,
  onValueChange,
  style,
  error,
  right,
  left,
}) {
  const { isDarkMode } = useDarkMode();
  const [value, setValue] = useState();

  const handleValueChange = (selectedValue) => {
    setValue(selectedValue);
    onValueChange(selectedValue);
  };

  return (
    <View style={style}>
      <TextInput
        maxLength={maxLength ? maxLength : null}
        label={label}
        style={
          isDarkMode
            ? { backgroundColor: Color.darkTheme }
            : { backgroundColor: Color.white }
        }
        selectionColor={Color.Blue700}
        outlineColor={Color.Blue200}
        activeOutlineColor={Color.Blue800}
        mode={mode}
        value={value}
        error={error}
        right={right}
        left={left}
        onChangeText={(value) => handleValueChange(value)}
        keyboardType={keyboardType ? keyboardType : null}
      />
    </View>
  );
}

export default Input;
