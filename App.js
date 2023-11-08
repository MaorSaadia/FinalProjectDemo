import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import StackScreens from "./src/navigation/StackScreens";
import { StudentContext, useStudents } from "./src/context/StudentContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

export default function App() {
  const { login } = useStudents();

  return (
    <QueryClientProvider client={queryClient}>
      <StudentContext.Provider
        value={{
          id: "12",
          name: "maor",
          age: "1",
          academic: "fd",
          department: "fd",
          yearbook: "2",
          gender: "gfg",
          email: "email",
          login,
        }}
      >
        <StackScreens />
      </StudentContext.Provider>
    </QueryClientProvider>
  );
}
