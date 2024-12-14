// import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setUser, setusertoken } from "../../Redux/OuthSlice";

export default function Login() {
    const navigate=useNavigate()
    const Dispatch=useDispatch()
    const user=useSelector(state=>state.Outh.user) || {}
  const [input, setinput] = useState({
    email: "",
    password: "",
  });
 
  const EventChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setinput({ ...input, [name]: value });
  };
  const loginHandle = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        {email:input.email,Password:input.password}
      );
      alert(response.data.message);

      if(response.status===200){
        // console.log(response.data.user)
        Dispatch(setUser(response.data.user))
        console.log(response.data.user)

        Dispatch(setusertoken(response.data.token))
        navigate('/')
      }
    } catch (error) {
        console.log(error)
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  };
  return (
    <div className="flex items-center justify-center  w-full mt-5 h-screen">
      <form
        onSubmit={loginHandle}
        className="shadow-lg  flex flex-col gap-8 p-6 border rounded "
      >
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-center text-xl">Logo</h1>
          <p className="font-medium text-center">
            login to see your friends photos
          </p>
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
          Login
        </button>
        <span className="text-center"> Dont have account? <NavLink to='/SignUp' className='underline text-aqua-500' >SignUp</NavLink> </span>
      </form>
    </div>
  );
}
