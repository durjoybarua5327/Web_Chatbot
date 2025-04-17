import React from 'react'

const Chatform=()=> {
  return (
    <form className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Ask anything"
            required
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 transition flex items-center justify-center"
          >
            {/* Simple up arrow SVG */}
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="text-white"
            >
              <path 
                d="M12 19V5M12 5L5 12M12 5L19 12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
  )
}

export default Chatform
