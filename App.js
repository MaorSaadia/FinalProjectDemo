import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import StackScreens from "./src/navigation/StackScreens";
import { StudentContext, useStudents } from "./src/context/StudentContext";
import { DarkModeProvider } from "./src/context/DarkModeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

export default function App() {
  const {
    login,
    logout,
    id,
    name,
    avatar,
    age,
    gender,
    academic,
    department,
    yearbook,
    email,
  } = useStudents();

  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <StudentContext.Provider
          value={{
            id,
            name,
            avatar,
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
    </DarkModeProvider>
  );
}
