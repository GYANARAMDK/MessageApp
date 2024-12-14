// import React from "react";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setselectedpost } from "../../Redux/PostSlice";
export default function Comments({ open, setOpen }) {
  const Dispatch = useDispatch();
  const token = useSelector((state) => state.Outh.token);
  //  if (!open) return null; // Render nothing if open is false
  const [text, settext] = useState("");
  const post = useSelector((state) => state.Post.post);
  const selectedpost = useSelector((state) => state.Post.selectedpost);
  const ChangeEventHandle = (e) => {
    e.preventDefault();
    settext(e.target.value);
  };
  const CommentHandle = async (id) => {
    try {
      const response = await axios.post(
        `https://instaclone-1-187b.onrender.com/api/v1/post/${id}/comment/add`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      alert(response.data.message);
      if (response.status === 201) {
        const updatedselectedpost = {
          ...selectedpost,
          comments: [response.data.comment, ...selectedpost.comments],
        };

        Dispatch(setselectedpost(updatedselectedpost));
        const updatedposts = post.map((post) => {
          if (post._id === selectedpost._id) return updatedselectedpost;
          return post;
        });
        Dispatch(setPost(updatedposts));
        settext("");
      }
    } catch (error) {
      console.log(error);
      if (error.response) alert(error.response.data.message);
    }
  };
  return (
    <>
      {open && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setOpen(false)} // Close modal on background click
        >
          <div
            className=" flex bg-white shadow-lg h-[60%] rounded w-[60%]"
            onClick={(e) => e.stopPropagation()} // Prevent background click from closing modal
          >
            <img
              src={selectedpost.image}
              alt="Post"
              className="w-1/2 rounded object-cover"
            />
            <div className="flex flex-col w-1/2 p-4">
              <h1 className="font-semibold text-xl">Comments</h1>
              <hr />
              <div className="h-3/4 overflow-y-auto">
                {selectedpost.comments.map((comment) => (
                  <div key={comment._id} className="flex  mt-3 ">
                    {/* Avatar */}
                    <img
                      src={comment.author.profilepicture}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <span>
                        <p className="font-semibold ">{comment.author.name} </p>
                        <p className="font-small "> {comment.text}</p>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <hr />
              <div className="flex items-center justify-between mt-4 ">
                <input
                  type="text"
                  placeholder="add a comment"
                  className="flex-grow border w-full  rounded px-4 py-2 focus:outline-none text-sm"
                  onChange={(e) => {
                    ChangeEventHandle(e);
                  }}
                  value={text}
                />
                <button className="ml-2 bg-blue-500 text-white p-2  rounded-full hover:bg-blue-600">
                  <FaPaperPlane
                    onClick={() => {
                      CommentHandle(selectedpost._id);
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
