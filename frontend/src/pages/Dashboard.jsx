import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    API.get("/documents").then((res) => setDocs(res.data));
  }, []);

  const openDoc = (id) => {
    const token = localStorage.getItem("token");

    window.open(
      `http://localhost:5000/api/documents/${id}/view?token=${token}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold mb-4">Your Documents</h1>

      <div className="bg-white rounded shadow">
        {docs.map((doc) => (
          <div
            key={doc._id}
            onClick={() => openDoc(doc._id)}
            className="flex justify-between items-center px-4 py-3 border-b cursor-pointer hover:bg-indigo-50"
          >
            <div>
              <p className="font-medium text-indigo-600">{doc.fileName}</p>
              <p className="text-sm text-gray-500">Status: {doc.status}</p>
            </div>

            <span className="text-sm text-indigo-500">Open →</span>
          </div>
        ))}
      </div>
    </div>
  );
}
