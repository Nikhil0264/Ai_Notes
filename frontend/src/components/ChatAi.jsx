import React, { useState } from "react";
import api from "../services/api";



function ChatAi() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
  if (!input.trim()) return;

  setMessages((prev) => [...prev, { from: "user", text: input }]);
  console.log(input)
  setInput("");
  setLoading(true);

  try {
    const res = await api.post('/chat', { message: input }); 
    const data = res.data; 

    setMessages((prev) => [...prev, { from: "user", text: input }, { from: "ai", text: data.text }]);
  } catch (err) {
    console.log(err)
    setMessages((prev) => [...prev, { from: "user", text: input }, { from: "ai", text: "Error generating response" }]);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="h-full flex flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded ${
              m.from === "user"
                ? "bg-blue-500 text-white text-right"
                : "bg-gray-200 text-gray-900 text-left"
            }`}
          >
            {m.text}
          </div>
        ))}

        {loading && (
          <div className="p-2 rounded bg-gray-200 text-gray-900">
            AI is typing...
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          className="flex-1 border px-2 py-1 rounded"
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button
          onClick={send}
          className="bg-blue-600 text-white px-4 rounded"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatAi;
