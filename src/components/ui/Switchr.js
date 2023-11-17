import { useState } from "react";
import { Switch } from "react-native-paper";

function Switchr({ color, onToggle }) {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    onToggle(!isSwitchOn);
  };
  return (
    <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color={color} />
  );
}

export default Switchr;
