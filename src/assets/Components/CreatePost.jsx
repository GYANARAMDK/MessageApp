// import React from 'react'
import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../Redux/PostSlice";
export default function CreatePost({ openpost, setopenpost }) {
  // if (!openpost) return null;
  const Imageref = useRef();
  const token = useSelector((state) => state.Outh.token);
  const [file, setfile] = useState();
  const post = useSelector((state) => state.Post.post);
  const Dispatch = useDispatch();
  const [preview, setpreview] = useState();
  const [caption, setcaption] = useState();
  const onfilechangeHandle = () => {
    const selectedfile = Imageref?.current?.files[0];
    setfile(selectedfile);
    if (selectedfile) {
      setpreview(URL.createObjectURL(selectedfile));
    }
  };
  const CreatePost = async () => {
    // if (!caption || !file) {
    //   alert("Please add a caption and select a file.");
    //   return;
    // }
    const formData = new FormData();
    formData.append("caption", caption);
    if (file) formData.append("image", file);

    try {
      const response = await axios.post(
        "https://instaclone-1-187b.onrender.com/api/v1/post/addpost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data.populatedPost);
      Dispatch(setPost([response.data.populatedPost, ...post]));
      setopenpost(false);
      alert(response.data.message);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      }
      console.log(error);
    }
  };
  return (
    <>
      {openpost && (
        <div
          className=" fixed w-full h-full bg-black bg-opacity-50 flex top-0 left-0 z-51 items-center justify-center "
          onClick={() => setopenpost(false)}
        >
          <div
            className=" flex flex-col items-center justify-between p-4 bg-white rounded h-[80%] w-[30%] "
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h1 className="font-semibold "> Create New Post</h1>
            <input
              ref={Imageref}
              type="file"
              className="hidden"
              onChange={onfilechangeHandle}
            />
            {preview && (
              <img src={preview} alt="Preview" className="mt-4 max-h-48" />
            )}
            {preview && (
              <div className="flex justify-between w-full">
                <input
                  type="text"
                  placeholder="add a caption "
                  className="focus:outline-none text-medium"
                  value={caption}
                  onChange={(e) => {
                    setcaption(e.target.value);
                  }}
                />
                <p
                  className="cursor-pointer bg-blue-400 rounded p-2 "
                  onClick={CreatePost}
                >
                  Post
                </p>
              </div>
            )}

            <button
              onClick={() => {
                Imageref.current.click();
              }}
              className="bg-blue-400  rounded border-2 p-2"
            >
              choose file from computer
            </button>
          </div>
        </div>
      )}
    </>
  );
}
