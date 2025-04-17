import { useState } from "react";
import "./App.css";
import Robot_icon from "./components/robot_icon.jsx";
import Chatform from "./components/Chatform.jsx";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white px-6 py-4 flex items-center shadow-md">
        <div className="flex items-center gap-3">
          <Robot_icon />
          <h2 className="text-lg font-semibold">Chatbot</h2>
        </div>
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-gray-50">
        {/* Bot Message */}
        <div className="flex items-start gap-3 max-w-md">
          <Robot_icon />
          <p className="bg-blue-100 text-gray-800 px-4 py-2 rounded-xl rounded-tl-none text-sm">
            Hi there, How can I help
          </p>
        </div>

        {/* User Message */}
        <div className="flex justify-end">
          <p className="bg-green-200 text-gray-800 px-4 py-2 rounded-xl rounded-tr-none max-w-md text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim
            quam labore necessitatibus modi illo autem temporibus rerum
            expedita debitis incidunt?
          </p>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200">
        <Chatform/>
      </div>
    </div>
  );
}

export default App;