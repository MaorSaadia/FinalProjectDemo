import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import StackScreens from "./src/navigation/StackScreens";
import { StudentContext, useStudents } from "./src/context/StudentContext";
import Toast from "react-native-toast-message";

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
