import { createSlice } from "@reduxjs/toolkit";

const PostSlice= createSlice(
    {
        name: 'Post',
        initialState:{
            post:[],
            selectedpost:null
        },
        reducers:{
            setPost: (state,action)=>{
                 state.post= action.payload
            },
            setselectedpost: (state,action)=>{
                state.selectedpost=action.payload
            }
        }
    }
)
export const {setPost,setselectedpost} = PostSlice.actions;
export default PostSlice.reducer;