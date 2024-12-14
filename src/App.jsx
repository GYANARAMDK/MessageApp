import "./App.css";
import Home from "./assets/Components/Home";
import MainLayout from "./assets/Components/MainLayout";
import Login from "./assets/Components/Login";
import SingUp from "./assets/Components/SingUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./assets/Components/Profile";
import EditProfile from "./assets/Components/EditProfile";
function App() {
  const BrouswerRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "Home",
          element: <Home />,
        },
        {
          path: "Profile/:id",
          element: <Profile />,
        },
        {
          path:"account/edit",
          element:<EditProfile/>
        }
      ],
    },
    {
      path: "/SignUp",
      element: <SingUp />,
    },
    {
      path: "/Login",
      element: <Login />,
    },
  ]);
  return (
    <>
      <RouterProvider router={BrouswerRouter} />
    </>
  );
}

export default App;
