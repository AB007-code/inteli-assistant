import { useEffect, useState, useRef } from "react";
import API from "../services/api";

export default function Chat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await API.get("/chat/history");

        const historyMessages = [];
        res.data.forEach((item) => {
          historyMessages.push({
            role: "user",
            text: item.question,
          });
          historyMessages.push({
            role: "assistant",
            text: item.answer,
            references: item.references,
          });
        });

        setMessages(historyMessages);
      } catch (err) {
        console.error("Failed to load chat history");
      }
    };

    loadHistory();
  }, []);

  const ask = async () => {
    if (!question.trim() || isLoading) return;

    setIsLoading(true);

    setMessages((prev) => [...prev, { role: "user", text: question }]);

    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: "Thinking...", isThinking: true },
    ]);

    setQuestion("");

    try {
      const res = await API.post("/chat/ask", { question });

      setMessages((prev) =>
        prev
          .filter((msg) => !msg.isThinking)
          .concat({
            role: "assistant",
            text: res.data.answer,
            references: res.data.references,
          })
      );
    } catch (err) {
      setMessages((prev) =>
        prev
          .filter((msg) => !msg.isThinking)
          .concat({
            role: "assistant",
            text: "Something went wrong. Please try again.",
          })
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow p-4 flex-1 overflow-y-auto">
        {messages.length === 0 && (
          <p className="text-center text-gray-400 mt-10">
            Ask questions about your uploaded documents
          </p>
        )}

        {messages.map((msg, i) => (
          <div key={i} className="mb-5">
            {msg.role === "user" && (
              <div className="text-right">
                <span className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg max-w-xs break-words">
                  {msg.text}
                </span>
              </div>
            )}

            {msg.role === "assistant" && (
              <div className="mt-2">
                <div className="inline-block bg-gray-200 px-4 py-2 rounded-lg break-words">
                  {msg.text}
                </div>

                {msg.references?.length > 0 && (
                  <div className="mt-2 text-sm text-gray-600">
                    <p className="font-semibold">References:</p>
                    {msg.references.map((r, idx) => (
                      <div key={idx}>
                        <b>{r.document}</b>: {r.excerpt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        <div ref={bottomRef} />
      </div>
      <div className="w-full max-w-3xl flex mt-4 gap-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask()}
          disabled={isLoading}
          placeholder={
            isLoading
              ? "Waiting for response..."
              : "Ask about your documents..."
          }
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:bg-gray-100"
        />
        <button
          onClick={ask}
          disabled={isLoading}
          className="bg-indigo-600 text-white px-6 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isLoading ? "Processing..." : "Ask"}
        </button>
      </div>
    </div>
  );
}
