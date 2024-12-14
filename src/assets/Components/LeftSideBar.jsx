import axios from "axios";
// import React from "react";
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

import { useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Redux/OuthSlice";
import { useState } from "react";
import CreatePost from "./CreatePost";



export default function LeftSideBar() {
  const user= useSelector(state=>state.Outh.user)
  const [openpost,setopenpost]=useState(false)
  const Dispatch= useDispatch()
  const Navigate=useNavigate()
  const LogoutHandle = async()=>{
    try {
       const response=await axios.get('https://instaclone-1-187b.onrender.com/api/v1/user/logout')
       if(response.status===200)

        alert(response.data.message)
       Dispatch(setUser(null))
      Navigate('/Login')
    } catch (error) {
      console.log(error)
      if(error.response)
        alert(error.response.data.error)
    }
  }
  const SideBarHandle =(texttype)=>{
    if(texttype==='Logout') {
           LogoutHandle();
    }
    if(texttype==='Create'){
          setopenpost(true);
          console.log("hello")
        
    }
    if(texttype==='Profile')
      Navigate(`/Profile/${user.id}`)
    if(texttype==='Home')
      Navigate(`/`)
  }
  return (<>
 
    <div className="flex flex-col  mt-4 border w-full">
      {SideBarIcon.map((item,index) => {
        return <div key={(index)} className="flex gap-4 p-5  items-center " onClick={()=>{SideBarHandle(item.text)}}>
              {item.icon}{ item.text} 
        </div>;
      })}
    </div>
     <CreatePost openpost={openpost} setopenpost={setopenpost}/> 
    </>
  );
}
