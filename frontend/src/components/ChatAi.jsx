import React, { useState } from "react";
import api from "../services/api";

function ChatAi() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;

    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/chat", { message: userMessage });
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: res.data.text }
      ]);
    } catch (err) {
      console.log(err);
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: "⚠️ Error generating response" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-100 to-slate-200">
      
      {/* Header */}
      <div className="p-4 font-semibold text-lg bg-white shadow">
        🤖 AI Chat
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[75%] px-4 py-2 rounded-2xl shadow
              ${m.from === "user"
                ? "ml-auto bg-blue-600 text-white rounded-br-none"
                : "mr-auto bg-white text-gray-800 rounded-bl-none"
              }`}
          >
            {m.text}
          </div>
        ))}

        {loading && (
          <div className="mr-auto bg-white px-4 py-2 rounded-2xl shadow animate-pulse">
            AI is typing…
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-400"
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button
          onClick={send}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-full disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatAi;
