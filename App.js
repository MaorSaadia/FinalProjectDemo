import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import { StudentContext, useStudents } from "./src/context/StudentContext";
import { DarkModeProvider } from "./src/context/DarkModeContext";
import AuthStackScreens from "./src/navigation/AuthStackScreens";

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
    token,
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
            token,
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
          <AuthStackScreens />
          <Toast />
        </StudentContext.Provider>
      </QueryClientProvider>
    </DarkModeProvider>
  );
}
