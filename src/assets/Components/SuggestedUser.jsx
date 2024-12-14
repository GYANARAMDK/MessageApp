// import React from 'react'

import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setsuggesteduser } from "../../Redux/OuthSlice";
import { NavLink } from "react-router-dom";

export default function SuggestedUser() {
  const Dispatch = useDispatch();
  const token = useSelector(state=>state.Outh.token)
   const suggesteduser = useSelector((state) => state.Outh.suggesteduser);
  useEffect(() => {
    const fetchuser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/suggested",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
       
        Dispatch(setsuggesteduser(response.data.suggestedusers));
      } catch (error) {
        console.log(error);
        if (error.response) {
          alert(error.response.data.message);
        }
      }
    };
    fetchuser();
  });
  return (
    <div className="my-2 px-4">
      <div className="flex  items-center gap-2 text-sm">
        <h1 className="font-semibold text-gray-400">Suggested for you </h1>
        <span className="font-medium cursor-pointer ">See All</span>
      </div>
      {suggesteduser.map((user) => {
        return (
          <div key={user._id} className="mt-8 overflow-y-auto">
            <div className="flex items-center justify-between">
              {/* Avatar */}
              <div className=" flex items-center">
                <NavLink to={`/profile/${user._id}`}>
                  <img
                    src={user.profilepicture}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover mr-4 "
                  />
                </NavLink>

                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.bio} </p>
                </div>
              </div>
              <span className="text-[#3Badf8] cursor-pointer text-xs font-bold hover:text-[#1f7fc0] ">
                follow
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
