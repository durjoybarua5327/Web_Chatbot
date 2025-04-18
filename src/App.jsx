import { useState,useEffect,useRef  } from "react";
import "./App.css";
import Robot_icon from "./components/robot_icon.jsx";
import Chatform from "./components/Chatform.jsx";
import ChatMessage from "./components/ChatMessage.jsx";

function App() {
  const bottomRef = useRef(null);

  const [count, setCount] = useState(0);
  const [ChatHistory, setChatHistory] = useState([]);
  const updateHistory = (text) => {
    setChatHistory((prev) => [
      ...prev.filter((msg) => msg.text != "Thinking..."),
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

  return (
    <div class="whole_chat_body">
    <div className="w-[30vw] h-screen flex flex-col bg-white">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4 flex items-center justify-between shadow-lg rounded-b-lg border-b-4 border-blue-400">
        <div className="flex items-center gap-3">
          <Robot_icon className="w-8 h-8 text-blue-200" />
          <h2 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-white">
            Chatbot Assistant
          </h2>
        </div>
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-blue-400"></div>
          <div className="w-3 h-3 rounded-full bg-blue-300"></div>
          <div className="w-3 h-3 rounded-full bg-blue-200"></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-gray-50">
        <div className="flex items-start gap-3 max-w-md">
          <Robot_icon />
          <p className="bg-blue-100 text-gray-800 px-4 py-2 rounded-xl rounded-tl-none text-sm">
            Hi there, How can I help
          </p>
        </div>

        {ChatHistory.map((chat, index) => (
          <ChatMessage key={index} chat={chat} />
        ))}

        <div ref={bottomRef} />
      </div>

      <div className="p-4 border-t border-gray-200">
        <Chatform
          ChatHistory={ChatHistory}
          setChatHistory={setChatHistory}
          generateBotResponse={generateBotResponse}
        />
      </div>
    </div>
  </div>
  );
}

export default App;
