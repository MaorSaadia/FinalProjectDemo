import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from "react";

const StudentContext = createContext({
  login: () => {},
  logout: () => {},
});

function useStudents() {
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);
  const [academic, setAcademic] = useState(null);
  const [department, setDepartment] = useState(null);
  const [yearbook, setYearbook] = useState(null);
  const [gender, SetGender] = useState(null);
  const [email, SetEmail] = useState(null);

  const login = useCallback((data) => {
    const saveData = async () => {
      const { _id, name, age, academic, department, yearbook, gender, email } =
        data.user;

      setId(_id);
      setName(name);
      setAge(age);
      setAcademic(academic);
      setDepartment(department);
      setYearbook(yearbook);
      SetGender(gender);
      SetEmail(email);

      try {
        await AsyncStorage.setItem("studentData", JSON.stringify(data));
      } catch (err) {
        console.log(err);
      }
    };

    saveData();
  }, []);

  const logout = useCallback(() => {
    const removeData = async () => {
      try {
        await AsyncStorage.removeItem("studentData");
      } catch (err) {
        console.log(err);
      }

      setId(null);
      setName(null);
      setAge(null);
      setAcademic(null);
      setDepartment(null);
      setYearbook(null);
      SetGender(null);
      SetEmail(null);
    };

    removeData();
  }, []);

  // useEffect(() => {
  //   const storedData = JSON.parse(localStorage.getItem("studentData"));
  //   if (storedData) {
  //     login(
  //       storedData._id,
  //       storedData.name,
  //       storedData.age,
  //       storedData.academic,
  //       storedData.department,
  //       storedData.yearbook,
  //       storedData.gender,
  //       storedData.email
  //     );
  //   }
  // }, [login]);

  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error("StudentContext was use outside of the StudentProvider");
  }
  return {
    context,
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
  };
}

export { StudentContext, useStudents };
