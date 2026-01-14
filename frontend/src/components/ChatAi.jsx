import React, { useState } from "react";

function ChatAi() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;

    setMessages((m) => [...m, { from: "user", text: input }]);
    setMessages((m) => [...m, { from: "ai", text: "AI response here" }]);
    setInput("");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded ${
              m.from === "user"
                ? "bg-blue-500 text-white text-right"
                : "bg-gray-200"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="p-3 border-t flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          className="flex-1 border px-2 py-1 rounded"
        />
        <button
          onClick={send}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatAi;
