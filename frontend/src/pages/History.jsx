import { useEffect, useState } from "react";
import API from "../services/api";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    API.get("/chat/history").then((res) => setHistory(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-semibold mb-6">Query History</h2>

      {history.map((item) => (
        <div key={item._id} className="bg-white p-4 mb-4 rounded shadow">
          <p className="font-semibold">Q: {item.question}</p>
          <p className="mt-2">A: {item.answer}</p>

          <div className="mt-2 text-sm text-gray-600">
            {item.references.map((r, idx) => (
              <div key={idx}>
                <strong>{r.document}</strong>: {r.excerpt}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
