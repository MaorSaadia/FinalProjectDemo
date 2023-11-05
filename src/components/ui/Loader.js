import { ActivityIndicator } from "react-native-paper";

function Loader({ color, size }) {
  return <ActivityIndicator animating={true} color={color} size={size} />;
}

export default Loader;
