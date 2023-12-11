import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import { Color } from "../../constants/colors";

function CustomHeaderButton(props) {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={props.color ?? Color.Blue500}
    />
  );
}

export default CustomHeaderButton;
