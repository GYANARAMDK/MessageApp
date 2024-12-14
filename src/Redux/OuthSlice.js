import { createSlice } from "@reduxjs/toolkit";

const OuthSlice= createSlice(
    {
        name: 'Outh',
        initialState:{
            user:null,
            suggesteduser:[],
            profile:null,
            token:null
        },
        reducers:{
            setUser: (state,action)=>{
                 state.user= action.payload
            },
            setsuggesteduser: (state,action)=>{
                state.suggesteduser= action.payload
            },
            setprofile: (state,action)=>{
                state.profile=action.payload
            },
            setusertoken:(state,action)=>{
                state.token=action.payload
            }
        }
    }
)
export const {setUser, setsuggesteduser,setprofile,setusertoken} = OuthSlice.actions;
export default OuthSlice.reducer;