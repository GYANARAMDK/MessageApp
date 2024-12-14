// import React from 'react'

import { Outlet, useNavigate } from "react-router-dom";
import LeftSideBar from "./LeftSideBar";
import { useSelector } from "react-redux";

export default function MainLayout() {
    const Navigate=useNavigate()
    const token=useSelector(state=>state.Outh.token)
    if(!token)
      Navigate('/SignUp')
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/4 bg-gray-200 h-full">
        <LeftSideBar />
      </div>
      <div className="flex-grow overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}
