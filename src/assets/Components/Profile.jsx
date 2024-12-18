// import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { setprofile, setUser } from "../../Redux/OuthSlice";
import { FaCog } from "react-icons/fa";
export default function Profile() {
  const token = useSelector((state) => state.Outh.token);
  const profile = useSelector((state) => state.Outh.profile || {});
  const user = useSelector((state) => state.Outh.user || {});
  const Dispatch = useDispatch();
  const params = useParams();

  const userid = params.id;
  const isloggedinuser = user?._id === profile?._id;

  const [activetab, setactivetab] = useState("Posts");
  const displayedpost = activetab === "Posts" ? profile.post : profile.bookmark;
  const [refresh,setrefresh]= useState(false)
  const [isfollow, setisfollow] = useState(
    profile?.follower?.includes(user._id)
  );

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `https://instaclone-1-187b.onrender.com/api/v1/user/profile/${userid}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        if (response.status === 200) Dispatch(setprofile(response.data.user));
      } catch (error) {
        console.log(error);
        if (error.response) alert(error.response.data.message);
      }
    };
    fetchdata();
  }, [userid,token,Dispatch,refresh]);

  const tabhandle = (texttype) => {
    setactivetab(texttype);
  };
  const FollowUnfollowHandle = async () => {
    const id = profile?._id;

    try {
      const response = await axios.post(
        `https://instaclone-1-187b.onrender.com/api/v1/user/follow/${id}`,
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      alert(response.data.message);
      if (response.status === 201) {
               setrefresh(!refresh)
               setisfollow(!isfollow);
               Dispatch(setUser(response.data.userthatfollow))
               Dispatch(setprofile(response.data.userthatfollowed))
      }
    } catch (error) {
      console.log(error);
      if (error.response) alert(error.response.data.message);
    }
  };
  return (
    <div className="flex  flex-col  w-full  mt-4 p-4">
      <div className="flex gap-16  ">
        <div>
          <img
            src={profile?.profilepicture}
            alt=""
            className=" rounded-full w-auto m-2 aspect-square  object-cover max-h-32"
          />
        </div>
        <div className="flex flex-col  gap-4 ">
          <div className="flex items-center gap-4 ">
            <p className="text-xl font-bold">{profile?.name}</p>
            {isloggedinuser ? (
              <>
                <NavLink to="/account/edit">
                  <button className="px-1 rounded  font-semiboldcursor-pointer text-lg bg-[#0095f6]">
                    Edit profile
                  </button>
                </NavLink>
                <button className="px-1 rounded font-semiboldcursor-pointer text-lg bg-[#0095f6]">
                  View archive
                </button>
                <button className="px-1 rounded font-semibold cursor-pointer ">
                  <FaCog />
                </button>
              </>
            ) : (
              <>
                <button
                  className="px-1 rounded  font-semibold cursor-pointer text-lg bg-[#79b8e2]  hover:bg-[#5397c5] "
                  onClick={FollowUnfollowHandle}
                >
                  {isfollow ? "unfollow" : "follow"}
                </button>
                {isfollow && (
                  <button className="px-1 rounded font-semibold cursor-pointer text-lg bg-[#6cb0de]  hover:bg-[#5397c5]">
                    message
                  </button>
                )}
              </>
            )}
          </div>
          <div className="flex items-center gap-4">
            <p>
              {" "}
              <span className=" text-lg font-semibold ">
                {profile?.post?.length || 0}
              </span>{" "}
              Post{" "}
            </p>
            <p>
              {" "}
              <span className="  cursor-pointer text-lg font-semibold ">
                {profile?.follower?.length || 0}
              </span>{" "}
              Followers{" "}
            </p>
            <p>
              {" "}
              <span className="  cursor-pointer text-lg font-semibold ">
                {profile?.following?.length || 0}
              </span>{" "}
              Following{" "}
            </p>
          </div>
          <div className="flex flex-col  gap-2">
            <p className="cursor-pointer text-sm"> @username</p>
            <p className="cursor-pointer text-normal p-2">
              {" "}
              {profile?.bio || "bio here... "}{" "}
            </p>
          </div>
        </div>
      </div>
      <hr className="m-4" />
      <div className=" flex flex-col">
        <div className="flex justify-around ">
          <p
            className={` text-lg cursor-pointer ${
              activetab === "Posts" ? "underline font-normal " : "font-light"
            }`}
            onClick={() => {
              tabhandle("Posts");
            }}
          >
            {" "}
            Posts
          </p>
          <p
            className={` text-lg cursor-pointer ${
              activetab === "Saved" ? "underline font-normal" : " font-light"
            }`}
            onClick={() => {
              tabhandle("Saved");
            }}
          >
            {" "}
            Saved{" "}
          </p>
        </div>
        <hr className="m-4" />
        <div className="grid grid-cols-3">
          {displayedpost?.map((post) => {
            return (
              <div key={post?._id} className="">
                <img
                  src={post?.image}
                  alt="post image"
                  className={`rounded-sm w-full m-2 aspect-square  object-cover `}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
