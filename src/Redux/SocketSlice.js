import { createSlice } from "@reduxjs/toolkit";

const SocketioSlice= createSlice(
    {
        name: 'Socketio',
        initialState:{
            socket:null,
            onlineuser:[],
            messages:[]
        },
        reducers:{
           setsoket: (state,action)=>{
            state.socket=action.payload;
           },
           setonlineuser:(state,action)=>{
            state.onlineuser=action.payload
           },
           clearsoket: (state)=>{
            state.socket=null
           },
           setmessages: (state,action)=>{
            state.messages = action.payload
           },
           setaddmessage: (state,action)=>{
            state.messages= [...state.messages, action.payload]
           }
        }
    }
)
export const {setsoket,setonlineuser,clearsoket,setmessages,setaddmessage} = SocketioSlice.actions;
export default SocketioSlice.reducer;