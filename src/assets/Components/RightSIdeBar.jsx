// import React from 'react'

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import SuggestedUser from "./SuggestedUser";

export default function RightSIdeBar() {
  const user = useSelector((state) => state.Outh.user); 
  return (
    <div className="flex flex-col px-4  mt-4 h-[90%] border-2 broder-red-300">
      <div className="flex items-center ">
        <NavLink to={`/profile/${user._id}`}>
          <img
            src={user.profilepicture}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
        </NavLink>
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-gray-500"> </p>
        </div>
      </div>
      
      <SuggestedUser/>
      
    </div>
  );
}
