import { useState } from "react";
import { TextInput } from "react-native-paper";

import { useDarkMode } from "../context/DarkModeContext";
import { Color } from "../constants/colors";

function PasswordInput({ mode, onValueChange, label }) {
  const { isDarkMode } = useDarkMode();

  const [isSecure, setIsSecure] = useState(true);
  const [changeValue, setChangeValue] = useState();

  const handleValueChange = (selectedValue) => {
    setChangeValue(selectedValue);
    onValueChange(selectedValue);
  };

  return (
    <TextInput
      autoCapitalize="none"
      label={label}
      style={
        isDarkMode
          ? { backgroundColor: Color.darkTheme }
          : { backgroundColor: Color.white }
      }
      right={
        <TextInput.Icon
          icon={isSecure ? "eye" : "eye-off"}
          onPress={() => setIsSecure(!isSecure)}
        />
      }
      selectionColor={Color.Blue700}
      outlineColor={Color.Blue200}
      activeOutlineColor={Color.Blue800}
      mode={mode}
      onChangeText={(value) => handleValueChange(value)}
      secureTextEntry={isSecure}
    />
  );
}

export default PasswordInput;
