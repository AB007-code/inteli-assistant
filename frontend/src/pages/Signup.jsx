import { useState } from "react";
import API from "../services/api";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    await API.post("/auth/signup", { name, email, password });
    alert("Account created successfully");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-96 bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Create Account
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Sign up to upload and search documents
        </p>

        <input
          className="w-full mb-3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full mb-3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-5 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={submit}
          className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
