import React from "react";
import { useRef } from "react";
const Chatform = ({ChatHistory , setChatHistory ,generateBotResponse }) => {
  const inputref = useRef();
  const handleSubmit=(e)=>{
    e.preventDefault()
    const userMessage =inputref.current.value.trim();
    if(!userMessage) return;
    console.log(userMessage)
    inputref.current.value = "";

    setChatHistory((history) => [...history, {role:"user" , text:userMessage} ])
    setTimeout(()=> {
      setChatHistory((history) => [...history, {role:"model" , text:"Thinking..."} ]);
      generateBotResponse([...ChatHistory, {role:"user" , text:userMessage} ])
  }, 600)
    

  }

  return (
    <form action="#" className="flex items-center gap-3" onSubmit={handleSubmit}>
      <input
        type="text"
        ref={inputref}
        placeholder="Ask anything"
        required
        className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 transition flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-12 h-12 text-black"
        >
          <path
            fillRule="evenodd"
            d="M12 3l-7 7h4v7h6v-7h4l-7-7z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </form>
  );
};

export default Chatform;
