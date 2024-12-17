// import React from 'react'

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setselecteduser } from "../../Redux/OuthSlice";
import ChatMessage from "./ChatMessage";

export default function ChatPage() {
  const onlineuser = useSelector((state) => state.Socketio.onlineuser);
  console.log(onlineuser);
  const user = useSelector((state) => state.Outh.user);
  const Dispatch = useDispatch();
  const selecteduser = useSelector((state) => state.Outh.selecteduser);
  console.log(user);
  return (
    <div className="flex h-screen ">
      <div className=" mt-4 flex  flex-col   mx-2 px-2   ">
        <section className="flex ">
          <img
            src={user.profilepicture}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover  "
          />

          <h1 className="font-bold text-lg p-2"> @{user.name} </h1>
        </section>
        <hr className="m-4 bg-gray-300" />
        <div className="overflow-y-auto h-[80vh] flex flex-col gap-2 ">
          {user.following?.map((user) => {
            const isonline = onlineuser?.includes(user?._id);
            return (
              <div
                key={user._id}
                className="flex items-center  gap-2 cursor-pointer "
                onClick={() => {
                  Dispatch(setselecteduser(user));
                }}
              >
                <img
                  src={user.profilepicture}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover  "
                />

                <div>
                  <div className="flex flex-col justify-center">
                    <span className="font-semibold">{user.name}</span>
                   

                    <span
                      className={`text-sm ${
                        isonline ? "text-green-500" : "text-red-500"
                      } font-bold`}
                    >
                      {isonline ? "online" : "offline"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <hr className="m-4 bg-gray-300" />
      </div>
      <div className=" h-screen flex flex-grow flex-col py-3">
        {selecteduser && (
          <>
            <section className="flex  mt-4 items-center gap-3 border rounded border-gray-400 mx-2 px-2 py-2  sticky">
              <NavLink to={`/Profile/${selecteduser._id}`}>
                <img
                  src={selecteduser?.profilepicture}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover  "
                />
              </NavLink>
              <h1 className="font-bold text-lg p-2"> @{selecteduser?.name} </h1>
            </section>
            {/* <div className="flex-1 overflow-auto"> */}
            {<ChatMessage />}
            {/* </div> */}
            <div className="flex mt-4 items-center justify-between border border-gray-400 mx-2 px-2 rounded  sticky">
              <input
                type="text"
                placeholder="type message "
                className="focus:outline-none h-10 "
              />
              <button> Send </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
