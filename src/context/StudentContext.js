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

// const studentValue = {
//   id: "12",
//   name: "maor",
//   age: "1",
//   academic: "fd",
//   department: "fd",
//   yearbook: "2",
//   gender: "gfg",
//   email: "email",
// };

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
    // console.log(data);
    // console.log(data.user.name);
    const { _id, name, age, academic, department, yearbook, email } = data.user;

    setId(_id);
    setName(name);
    setAge(age);
    setAcademic(academic);
    setDepartment(department);
    setYearbook(yearbook);
    SetGender("זכר");
    SetEmail(email);

    // AsyncStorage.setItem("studentData", JSON.stringify(data));

    // setId(data);
    // setName(data);
    // setAge(data);
    // setAcademic(data);
    // setDepartment(data);
    // setYearbook(data);
    // SetGender("זכר");
    // SetEmail(data);
  }, []);

  // useEffect(() => {
  //   const storedData = JSON.parse(localStorage.getItem("userData"));
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
