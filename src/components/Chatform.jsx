import React from "react";
import { useRef } from "react";
const Chatform = ({ ChatHistory, setChatHistory, generateBotResponse }) => {
  const inputref = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputref.current.value.trim();
    if (!userMessage) return;
    console.log(userMessage);
    inputref.current.value = "";

    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);
    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "Thinking..." },
      ]);
      generateBotResponse([
        ...ChatHistory,
        { role: "user", text: userMessage },
      ]);
    }, 600);
  };

  return (
    <form
      action="#"
      className="flex items-center gap-3"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        ref={inputref}
        placeholder="Ask anything"
        required
        className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div
        role="button"
        tabIndex="0"
        onClick={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleSubmit(e);
          }
        }}
        className="w-12 h-12 transition flex items-center justify-center cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="blue"
        >
          <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
        </svg>
      </div>
    </form>
  );
};

export default Chatform;
