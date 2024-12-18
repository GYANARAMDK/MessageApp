// import React from 'react'

import { Outlet, useNavigate } from "react-router-dom";
import LeftSideBar from "./LeftSideBar";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function MainLayout() {
  const Navigate = useNavigate();
  const token = useSelector((state) => state.Outh.token);
  useEffect(() => {
    if (!token) Navigate("/Login");
  }, [token,Navigate]);
  return (
    <>
      
      {(token) ? (
        <div className="flex h-screen overflow-hidden">
          <div className="w-1/4 bg-gray-200 h-full">
            <LeftSideBar />
          </div>
          <div className="flex-grow overflow-y-auto">
            <Outlet />
          </div>
        </div>
      ):
      <div className="flex items-center justify-center bg-red-500">
                 <a href="facebook.com"></a>
      </div>
    }

    </>
  );
  // return (
  //   <>
  //   <h1>how are you </h1>
  //   </>
  // )
}
