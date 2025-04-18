import { useState, useEffect, useRef } from "react";
import "./App.css";
import Robot_icon from "./components/robot_icon.jsx";
import Chatform from "./components/Chatform.jsx";
import ChatMessage from "./components/ChatMessage.jsx";

function App() {
  const bottomRef = useRef(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [count, setCount] = useState(0);
  const [ChatHistory, setChatHistory] = useState([]);

  const updateHistory = (text) => {
    setChatHistory((prev) => [
      ...prev.filter((msg) => msg.text !== "Thinking..."),
      { role: "model", text },
    ]);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ChatHistory]);

  const generateBotResponse = async (history) => {
    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
    const request_option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: history,
      }),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        request_option
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error.message || "Something is wrong");
      const api_text = data.candidates[0].content?.parts[0]?.text;
      updateHistory(api_text);
      console.log(api_text);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleChat = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div>
      {!isMinimized ? (
        <div
          onClick={toggleChat}
          className="fixed right-20 bottom-20 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
          </svg>
        </div>
      ) : (
        <div className="whole_chat_body fixed right-20 top-10 items-center shadow-2xl rounded-2xl overflow-hidden">
          <div className="w-[30vw] h-[90vh] flex flex-col bg-white rounded-2xl">
            {/* Header with close button */}
            <div className="rounded-t-2xl bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-full">
                  <Robot_icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-white">
                  Chatbot Assistant
                </h2>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                  <div className="w-3 h-3 rounded-full bg-blue-300"></div>
                  <div className="w-3 h-3 rounded-full bg-blue-200"></div>
                </div>
                <div
                  onClick={toggleChat}
                  className="p-1 rounded-full hover:bg-blue-700 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="white"
                  >
                    <path d="M160-240q-33 0-56.5-23.5T80-320v-447l-53-53 57-57L876-85l-57 57-212-212H160Zm720 45L755-320h45v-480H275l-80-80h605q33 0 56.5 23.5T880-800v605ZM160-320h367l-80-80H240v-80h127l-40-40h-87v-80h7l-87-87v367Zm515-80-80-80h125v80h-45ZM555-520l-80-80h245v80H555ZM435-640l-80-80h365v80H435Zm-91 136Zm171-56Z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-gradient-to-b from-blue-50 to-gray-50">
              <div className="flex items-start gap-3 max-w-md animate-fade-in">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Robot_icon className="w-5 h-5 text-blue-600" />
                </div>
                <p className="bg-blue-100 text-gray-800 px-4 py-3 rounded-xl rounded-tl-none text-sm shadow-sm">
                  Hi there! How can I help you today?
                </p>
              </div>

              {ChatHistory.map((chat, index) => (
                <ChatMessage key={index} chat={chat} />
              ))}

              <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
              <Chatform
                ChatHistory={ChatHistory}
                setChatHistory={setChatHistory}
                generateBotResponse={generateBotResponse}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
