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
           },
           clearsoket: (state)=>{
            state.socket=null
           }
        }
    }
)
export const {setsoket,setonlineuser,clearsoket} = SocketioSlice.actions;
export default SocketioSlice.reducer;