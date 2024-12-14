// import React from 'react'

import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function SingUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setinput] = useState({
    name: "",
    email: "",
    password: "",
  });
 
  const EventChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setinput({ ...input, [name]: value });
  };

  const SignUpHandle = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      setIsLoading(true)
      const response = await axios.post(
        "https://instaclone-1-187b.onrender.com/api/v1/user/register",
        input
      );
      alert(response.data.message);
      if(response.status===201)
      {
        input.name=''
        input.email=''
        input.password=''
      }
    } catch (error) {
        console.log(error)
      if (error.response) {
        alert(error.response.data.message);
      }
    } finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="flex items-center justify-center  w-full mt-5 h-screen">
      <form
        onSubmit={SignUpHandle}
        className="shadow-lg  flex flex-col gap-8 p-6 border rounded "
      >
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-center text-xl">Logo</h1>
          <p className="font-medium text-center">
            Sign Up to see your friends photos
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-small"> Name</label>
          <input
            type="text"
            name="name"
            className="focus:outline-none"
            value={input.name}
            onChange={(e) => {
              EventChangeHandler(e);
            }}
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <label className="font-small"> Email</label>
          <input
            type="text"
            name="email"
            className="focus:outline-none"
            value={input.email}
            onChange={(e) => {
              EventChangeHandler(e);
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-small"> Password</label>
          <input
            type="text"
            name="password"
            className="focus:outline-none "
            value={input.password}
            onChange={(e) => {
              EventChangeHandler(e);
            }}
          />
        </div>
        <button
          className="bg-blue-400 hover:bg-blue-500 rounded h-8"
          type="submit "
        >
         {isLoading ? (
          <div className="flex justify-center items-center ">
            <div className="animate-spin border-4 border-blue-400 border-t-transparent bg-opacity-50  rounded-full w-6 h-6"></div>
            <span className="ml-2">account creating...</span>
          </div>
        ) :'Create New Account'} 
        </button>
        <span className="text-center">Already have an account? <NavLink to='/Login' className='underline' >login</NavLink> </span>
      </form>
    </div>
  );
}
