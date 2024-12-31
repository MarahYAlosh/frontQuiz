import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import { Main } from "./Main";
import { Quiz } from "./Quiz";
import "./App.css";
import { CheckUserExist } from "../helper/helper";
import { SignUp } from "./SignUp";
import { Login } from "./Login";
import { TeacherPage } from "./TeacherPage";
import { useSelector } from "react-redux";
import { Comment } from "./Comment";
import { Result } from "./Result";
import { TeacherInputs } from "./TeacherInputs";

const App = () => {
  const index = useSelector((state) => state.result.index);
  const routes = createHashRouter([
    {
      path: "/",
      element: <Main></Main>,
    },
    {
      path: "/quiz",
      element: <Quiz />,
    },
    {
      path: "/comment",
      element: <Comment />,
    },
    {
      path: "/register",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/teacher",
      element: <TeacherPage />,
    },
    {
      path: "/teacherInputs",
      element: <TeacherInputs />,
    },
    {
      path: "/result",
      element: <Result />,
    },
  ]);
  return <RouterProvider router={routes} />;
};

//
export default App;
