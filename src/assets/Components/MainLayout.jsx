// import React from 'react'

import { Outlet } from "react-router-dom";
import LeftSideBar from "./LeftSideBar";

export default function MainLayout() {
    
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
