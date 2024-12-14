// import React from 'react'

import { Outlet } from "react-router-dom";
import Feed from "./Feed";
import RightSIdeBar from "./RightSIdeBar";

export default function Home() {
  return (
    <div className="flex  ">
     
      <div className="flex-grow">
        <Feed />
        <Outlet />
      </div>
      
      <div className="w-1/4 h-screen bg-gray-100 fixed right-0 top-0">
        <RightSIdeBar />
      </div>
    </div>
  );
}
