import { Link } from "react-router-dom";
import { isLoggedIn, logout } from "../utils/auth";

export default function Navbar() {
  const loggedIn = isLoggedIn();

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white border-b">
      <Link to="/" className="text-xl font-bold text-indigo-600">
        Document Hub
      </Link>

      <div className="flex items-center gap-5">
        {loggedIn ? (
          <>
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-indigo-600"
            >
              Dashboard
            </Link>
            <Link to="/chat" className="text-gray-700 hover:text-indigo-600">
              Chat
            </Link>
            <Link to="/history" className="text-gray-700 hover:text-indigo-600">
              History
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/signup"
              className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-50"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Sign In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
