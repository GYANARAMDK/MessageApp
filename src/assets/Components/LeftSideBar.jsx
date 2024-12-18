import axios from "axios";
import { Popover, PopoverTrigger, PopoverContent } from "@shadcn/ui";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setusertoken } from "../../Redux/OuthSlice";
import { useState } from "react";
import CreatePost from "./CreatePost";

import {
  FaHome,
  FaSearch,
  FaFire,
  FaEnvelope,
  FaBell,
  FaPlusCircle,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const SideBarIcon = [
  { icon: <FaHome />, text: "Home" },
  { icon: <FaSearch />, text: "Search" },
  { icon: <FaFire />, text: "Trending" },
  { icon: <FaEnvelope />, text: "Message" },
  { icon: <FaBell />, text: "Notification" },
  { icon: <FaPlusCircle />, text: "Create" },
  { icon: <FaUser />, text: "Profile" },
  { icon: <FaSignOutAlt />, text: "Logout" },
];

export default function LeftSideBar() {
  const likeNotification = useSelector(
    (state) => state.RealTimeNotification.likeNotification
  );
  const user = useSelector((state) => state.Outh.user); //  user from redux store
  const [openpost, setopenpost] = useState(false); //  set for createpost as a front
  const Dispatch = useDispatch(); //  used for dispatch actions of redux store
  const Navigate = useNavigate(); //  used for navigation betweens routes
  const [isLoading, setIsLoading] = useState(false); //  used for waiting inhance user experience
  const LogoutHandle = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://instaclone-1-187b.onrender.com/api/v1/user/logout"
      );
      if (response.status === 200) alert(response.data.message);
      Dispatch(setUser(null));
      Dispatch(setusertoken(null));
      Dispatch(setUser({}));
      Navigate("/Login");
    } catch (error) {
      console.log("Logout Error:", error);
      if (error.response) alert(error.response.data.error || "Logout failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const SideBarHandle = (texttype) => {
    switch (texttype) {
      case "Logout":
        LogoutHandle();
        break;
      case "Create":
        setopenpost(true);
        break;
      case "Profile":
        if (user?._id) {
          Navigate(`/Profile/${user._id}`);
        } else {
          alert("User not logged in!");
        }
        break;
      case "Home":
        Navigate(`/`);
        break;
      case "Message":
        Navigate(`/Chatpage`);
        break;
      default:
        console.log("Unknown sidebar action:", texttype);
    }
  };

  return (
    <>
      <div className="flex flex-col  mt-4 border w-full">
        {isLoading && (
          <div className="flex justify-center items-center w-screen h-screen">
            <div className="animate-spin border-4 border-blue-400 border-t-transparent bg-opacity-50 bg-black rounded-full w-6 h-6"></div>
            <span className="ml-2">Loging Out...</span>
          </div>
        )}

        {SideBarIcon.map((item, index) => {
          return (
            <div
              key={index}
              className="flex gap-4 p-5 items-center"
              onClick={() => {
                SideBarHandle(item.text);
              }}
            >
              {item.icon}
              {
              item.text===Notification && likeNotification.length>0 && 
              // <Popover>
              //          <PopoverTrigger asChild >
              //              <button       size='icon' className="rounded-full h-w-5 absolute bottom-6 left-6 " >{likeNotification.length} </button>
                            
              //          </PopoverTrigger>
              //          <PopoverContent>
              //           <div>
              //             {likeNotification.length===0 ? (<p>No Notification</p>):
              //                (likeNotification.map(Notification=>{
              //                 return(
              //                   <div key={Notification.userId}>
              //                         <img src={Notification?.userdetails?.profilepicture} alt="" />
                                     
              //                         <p className="text-sm"> <span className="font-bold">{Notification.userdetails.name}</span>{`${Notification.type } your post`} </p>
              //                     </div>
              //                 )
              //                }))
              //             }
              //           </div>
              //          </PopoverContent>
              // </Popover>
               
              }
              {item.text}
            </div>
          );
        })}
      </div>
      <CreatePost openpost={openpost} setopenpost={setopenpost} />
    </>
  );
}
