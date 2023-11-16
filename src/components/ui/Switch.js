import { useState } from "react";
import { Switch } from "react-native-paper";

function Switch({ color }) {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color={color} />
  );
}

export default Switch;
