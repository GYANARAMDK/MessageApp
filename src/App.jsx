import "./App.css";
import Home from "./assets/Components/Home";
import MainLayout from "./assets/Components/MainLayout";
import Login from "./assets/Components/Login";
import SingUp from "./assets/Components/SingUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./assets/Components/Profile";
import EditProfile from "./assets/Components/EditProfile";
import ChatPage from "./assets/Components/ChatPage";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setonlineuser, setsoket } from "./Redux/SocketSlice";
function App() {
  const Dispatch = useDispatch();
  const socket= useSelector(state=>state.Socketio.socket)
  const user = useSelector((state) => state.Outh.user);
  useEffect(() => {
    let socketio = null;
    if (user) {
      socketio = io("http://localhost:3000", {
        query: { userid: user?._id },
        transports: ["websocket"],
      });
      Dispatch(setsoket(socketio));
      socketio.on("getonlineusers", (onlineusers) => {
        Dispatch(setonlineuser(onlineusers));
        console.log(onlineusers);
      });
      return () => {
        socketio.close();
        Dispatch(setsoket(null));
      };
    } else if (socketio) {
      socket.close();
      Dispatch(setsoket(null));
    }
  }, [user]);
  const BroswerRouter = createBrowserRouter([
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
          path: "account/edit",
          element: <EditProfile />,
        },
        {
          path: "Chatpage",
          element: <ChatPage />,
        },
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
      <RouterProvider router={BroswerRouter} />
    </>
  );
}

export default App;
