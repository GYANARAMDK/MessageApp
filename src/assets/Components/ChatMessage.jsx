// import React from 'react'

import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { setmessages } from "../../Redux/SocketSlice";

export default function ChatMessage() {
  const socket = useSelector((state) => state.Socketio.socket);
  const Dispatch = useDispatch();
  const messages = useSelector((state) => state.Socketio.messages);
  const user = useSelector((state) => state.Outh.user);
  
  useEffect(() => {
    if (socket) {
      socket?.on("newMessage", (newMessage) => {
        Dispatch(setmessages([...messages, newMessage]));
        console.log(newMessage);
      });
      return () => {
        socket?.off("newMessage");
      };
    }
  }, [socket,messages]);

  return (
    <div className="overflow-y-auto p-4 flex-1">
      {!messages?.length ? (
        <div className="flex flex-col gap-3">NO messages...</div>
      ) : (
        <div className="flex flex-col gap-3">
          {messages?.map((msg) => {
            return (
              <div
                key={msg?._id}
                className={`text-bold font-sm text-black flex  ${
                  msg.senderId === user._id ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={` p-2 rounded ${
                    msg.senderId === user._id ? "bg-gray-400" : "bg-green-400 "
                  }`}
                >
                  {msg?.message}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
