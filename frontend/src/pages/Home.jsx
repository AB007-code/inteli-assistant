import { useState } from "react";
import API from "../services/api";

export default function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      await API.post("/documents/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Document uploaded successfully");
      setFile(null);
    } catch {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow w-full max-w-md">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-indigo-600 mb-1">
          Document Intelligence Hub
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Upload PDF or text documents and ask AI questions based on them.
        </p>
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-400 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-600 hover:bg-indigo-50 transition"
        >
          <svg
            className="w-10 h-10 text-indigo-500 mb-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16v-8m0 0 3 3m-3-3-3 3m9 4H6"
            />
          </svg>

          <p className="text-sm font-medium text-gray-700">
            Click to upload or drag & drop
          </p>
          <p className="text-xs text-gray-500 mt-1">PDF or TXT files only</p>

          <input
            id="file-upload"
            type="file"
            accept=".pdf,.txt"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>
        {file && (
          <div className="mt-3 text-sm text-gray-700">
            Selected file: <span className="font-medium">{file.name}</span>
          </div>
        )}
        <button
          onClick={upload}
          disabled={loading}
          className="mt-6 w-full py-2 rounded bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Document"}
        </button>
      </div>
    </div>
  );
}
