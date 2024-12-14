import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../Redux/OuthSlice";

export default function EditProfile() {
    const navigate= useNavigate()
  const token = useSelector((state) => state.Outh.token);
  const user = useSelector((state) => state.Outh.user);
  const Imageref = useRef();
  const Dispatch=useDispatch()

  const [formData, setFormData] = useState({
    bio: user?.bio || "",
    gender: user?.gender || "male",
    profilepicture: null,
  });

  const changehandler = (e) => {
    const { name, value } = e.target;
    if (name === "profilepicture") {
      setFormData((prev) => ({
        ...prev,
        profilepicture: Imageref.current.files[0] || prev.profilepicture,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const EditProfilehandler = async () => {
    // console.log(formData);
    const formDataobj= new FormData()
    formDataobj.append("bio", formData.bio);
    formDataobj.append("gender", formData.gender);
    formDataobj.append("profilepicture", formData.profilepicture);
    try {
      const response = await axios.patch(
        "http://localhost:3000/api/v1/user/profile/edit",
        formDataobj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if(response.status===200){
        alert(response.data.message)
        const updateduserdata={
            ...user, bio:response.data.user.bio, profilepicture:response.data.user.profilepicture,gender:response.data.user.gender
        }
        Dispatch(setUser(updateduserdata));

        navigate(-1)
      }
     
    } catch (error) {
      console.log(error);
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  };
  return (
    <div className="flex max-w-2xl mx-auto p-10">
      <section className="flex flex-col gap-6  w-full">
        <h1 className="font-bold text-xl">Edit Profile</h1>
        <div className="flex items-center bg-gray-100 rounded-xl p-4 justify-between">
          <div className="flex items-center gap-3">
            <img
              src={
                formData.profilepicture
                  ? URL.createObjectURL(formData.profilepicture)
                  : user.profilepicture
              }
              alt="profile picture"
              className=" rounded-full w-auto m-2 aspect-square  object-cover max-h-12 "
            />

            <div>
              <h1 className="font-bold text-sm">{user.name}</h1>
              <span>{formData.bio ? formData.bio : "bio here... "} </span>
            </div>
          </div>
          <input
            ref={Imageref}
            type="file"
            className="hidden"
            name="profilepicture"
            onChange={changehandler}
          />
          <button
            className="bg-[#0095f6] hover:bg-[#1081cc] rounded px-1 "
            onClick={() => {
              Imageref.current.click();
            }}
          >
            Change Photo
          </button>
        </div>
        <div className="bg-gray-100 rounded p-4">
          <h1 className="font-semibold  mb-2 ">Bio</h1>
          <textarea
            className=" w-full focus:outline-none"
            name="bio"
            value={formData.bio}
            onChange={changehandler}
            placeholder="Enter your bio..."
          ></textarea>
        </div>
        <div className="bg-gray-100 rounded flex items-center justify-between p-4">
          <h1 className="font-semibold mb-2"> Gender</h1>
          <select
            name="gender"
            value={formData.gender}
            onChange={changehandler}
          >
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>
        <div className="flex justify-end p-4">
          <button
            className="bg-[#0095f6] hover:bg-[#1081cc] p-1 rounded  "
            onClick={EditProfilehandler}
          >
            submit{" "}
          </button>
        </div>
      </section>
    </div>
  );
}
