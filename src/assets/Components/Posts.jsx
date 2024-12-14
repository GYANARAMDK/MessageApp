// import React from 'react'
import { useEffect, useState } from "react";
import {
  FaHeart,
  FaComment,
  FaBookmark,
  FaShare,
  FaPaperPlane,
} from "react-icons/fa";
import Comments from "./Comments";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setselectedpost } from "../../Redux/PostSlice";
import { NavLink } from "react-router-dom";

export default function Posts() {
  const [text, settext] = useState("");
  const [open, setOpen] = useState(false);

  const Dispatch = useDispatch();
  const token = useSelector(state=>state.Outh.token)
  const posts = useSelector((state) => state.Post.post);
  const user = useSelector((state) => state.Outh.user);

  const [like, setlike] = useState();
  
  useEffect(() => {
    const fetchpost = async () => {
      console.log(token)
      try {
        const response = await axios.get(
          "https://instaclone-1-187b.onrender.com/api/v1/post/allpost",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          console.log("helooooooo");
        }
        Dispatch(setPost(response.data.posts));
        console.log(response.data.posts);
        console.log(posts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchpost();
  }, []);
  
  const ChangeEventHandle = (e) => {
    e.preventDefault();
    settext(e.target.value);
  };
 
  const likeDislikeHandle = async (id) => {
    const targetpost = posts.find((post) => post._id === id);
    let liked = targetpost ? targetpost.likes.includes(user._id) : false;

    const action = liked ? "dislike" : "like";

    try {
      const response = await axios.get(
        `https://instaclone-1-187b.onrender.com/api/v1/post/${id}/${action}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        const updatedPosts = posts.map((post) => {
          if (post._id === id) {
            return {
              ...post,
              likes:
                action === "like"
                  ? [...new Set([...post.likes, user._id])] 
                  : post.likes.filter((uid) => uid !== user._id),
            };
          }
          return post;
        });
        Dispatch(setPost(updatedPosts));
      }
      // alert(response.data.message);
    } catch (error) {
      console.log(error);
      if(error.response) alert(error.response.data.message)
    }
  };
   const CommentHandle=async(id)=>{
        try {
          const response= await axios.post(`https://instaclone-1-187b.onrender.com/api/v1/post/${id}/comment/add`,{text},
            {

              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            }
          );
          alert(response.data.message)
          if (response.status === 201) {
            const updatedPosts = posts.map((post) => {
              if (post._id === id) {
                return {
                  ...post,
                  comments:
                       [response.data.comment, ...post.comments]
                      
                };
              }
              return post;
            });
            Dispatch(setPost(updatedPosts));
            settext('')
          }
        } catch (error) {
          console.log(error)
          if(error.response)
            alert(error.response.data.message)
        }
   }
  return (
    <>
      <div>
        {posts &&
          posts.map((item) => {
            return (
              <div
                className="max-w-xl mx-auto bg-white border rounded-lg shadow-lg my-4 ml-4  "
                key={item._id}
              >
                {/* Profile Section */}
                <div className="flex items-center p-4">
                  {/* Avatar */}
                  <NavLink to={`/profile/${user.id}`}>
                  <img
                    src={item.author.profilepicture}
                    alt="Profile"
                    className=" rounded-full w-auto  aspect-square  object-cover max-h-12 mr-4"
                  />
                 </NavLink>
                  <div>
                    <p className="font-semibold">{item.author.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.createdAt?.split("T")[0] || "first day"}
                    </p>
                  </div>
                </div>

                {/* Image */}
                <div className="relative">
                  <img
                    src={item.image}
                    alt="Post"
                    className="w-full rounded object-cover"
                  />
                </div>

                {/* Post Info */}
                <div className="p-4">
                  {/* Like, Comment, Share, and Save Icons */}
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                      <FaHeart
                        className={`text-2xl cursor-pointer ${
                          item.likes.includes(user._id) ? "text-red-500" : "text-gray-800"
                        } `}
                        onClick={() => {
                          likeDislikeHandle(item._id);
                        }}
                      />
                      <FaComment 
                        onClick={() => { Dispatch(setselectedpost(item))
                          setOpen(true);
                        }}
                        className="text-gray-800 text-2xl cursor-pointer"
                      />
                      <FaShare className="text-gray-800 text-2xl cursor-pointer" />
                    </div>
                    <FaBookmark className="text-gray-800 text-2xl cursor-pointer" />
                  </div>

                  {/* Likes and Comments */}
                  <p className="mt-2 text-gray-700 font-semibold">
                    {item.likes.length}
                  </p>
                  <p className="mt-1 text-gray-600">
                    <span className="font-semibold">{item.author.name}</span>{" "}
                    {item.caption}
                  </p>

                  {/* Comment Section */}
                  <div className="mt-2 text-gray-600">
                    <p
                      className="text-sm cursor-pointer"
                      onClick={() => { Dispatch(setselectedpost(item))
                        setOpen(true);
                      }}
                    >{`View all ${item.comments.length} comments`}</p>
                    <Comments open={open} setOpen={setOpen} />
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        placeholder="add a comment"
                        className="flex-grow border rounded-full px-4 py-2 focus:outline-none text-sm"
                        onChange={(e) => {
                          ChangeEventHandle(e);
                        }}
                        value={text}
                      />
                      {text && (
                        <button className="ml-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
                          <FaPaperPlane onClick={()=>{CommentHandle(item._id)}} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
