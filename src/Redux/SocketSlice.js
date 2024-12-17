import { createSlice } from "@reduxjs/toolkit";

const SocketioSlice= createSlice(
    {
        name: 'Socketio',
        initialState:{
            socket:null,
            onlineuser:[]
        },
        reducers:{
           setsoket: (state,action)=>{
            state.socket=action.payload;
           },
           setonlineuser:(state,action)=>{
            state.onlineuser=action.payload
           }
        }
    }
)
export const {setsoket,setonlineuser} = SocketioSlice.actions;
export default SocketioSlice.reducer;