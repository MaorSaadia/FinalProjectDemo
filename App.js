import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { Provider, MD3DarkTheme as DarkTheme } from "react-native-paper";

import StackScreens from "./src/navigation/StackScreens";
import { StudentContext, useStudents } from "./src/context/StudentContext";
import { Color } from "./src/constants/colors";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

// const CustomDarkTheme = {
//   ...DarkTheme,
//   colors: {
//     ...DarkTheme.colors,
//     background: Color.darkTheme,
//     text: Color.white,
//   },
// };

export default function App() {
  const {
    login,
    logout,
    id,
    name,
    age,
    gender,
    academic,
    department,
    yearbook,
    email,
  } = useStudents();

  return (
    <QueryClientProvider client={queryClient}>
      <StudentContext.Provider
        value={{
          id,
          name,
          age,
          gender,
          academic,
          department,
          yearbook,
          email,
          login,
          logout,
        }}
      >
        <StackScreens />
        <Toast />
      </StudentContext.Provider>
    </QueryClientProvider>
  );
}
