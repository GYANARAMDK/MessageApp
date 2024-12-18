import { createSlice } from "@reduxjs/toolkit";

const RealTimeNotification =createSlice({
    name:'RealTimeNotification',
    initialState:{
        likeNotification:[],
    },
    reducers:{
        setRealTimeNotification: (state,action)=>{
            if(action.payload.type==='like'){
                state.likeNotification.push(action.payload)
            }else if(action.payload.type==='dislike'){
                state.likeNotification=state.likeNotification.filter(item => item.userId!==action.payload.userId)
            }
        }
    }
})

export const {setRealTimeNotification}=RealTimeNotification.actions
export default RealTimeNotification.reducer;