import React from "react";
import Robot_icon from "./robot_icon";

function ChatMessage({ chat }) {
    if (!chat) {
        return (
          <div className="flex w-full mb-4 justify-start">
            <div className="flex-shrink-0 mr-2 mt-1">
              <Robot_icon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex flex-col items-start max-w-[85%]">
              <div className="px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm bg-blue-50 text-gray-800 rounded-tl-none border border-blue-100">
                Hi there! How can I help you today?
              </div>
              <div className="text-xs mt-1 text-gray-500 text-left">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        );
      }
    
  return (
    <div className={`flex w-full mb-4 ${chat.role === "model" ? "justify-start" : "justify-end"}`}>
      {chat.role === "model" && (
        <div className="flex-shrink-0 mr-2 mt-1">
          <Robot_icon className="w-6 h-6 text-blue-600" />
        </div>
      )}
      
      <div className={`flex flex-col ${chat.role === "model" ? "items-start" : "items-end"} max-w-[85%]`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
            chat.role === "model"
              ? "bg-blue-50 text-gray-800 rounded-tl-none border border-blue-100"
              : "bg-blue-500 text-white rounded-tr-none"
          }`}
        >
          {chat.text}
        </div>
        
        <div className={`text-xs mt-1 text-gray-500 ${chat.role === "model" ? "text-left" : "text-right"}`}>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          {chat.role === "user" && (
            <span className="ml-1 text-green-400">✓✓</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;