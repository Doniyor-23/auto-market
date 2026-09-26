import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, isAdmin, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600">AUTO MARKET</Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
            <Link to="/cars" className="text-gray-700 hover:text-blue-600 transition">Cars</Link>

            {isAuthenticated ? (
              <>
                <Link to="/favorites" className="text-gray-700 hover:text-blue-600 transition">Favorites</Link>
                <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition">Profile</Link>

                {isAdmin && (
                  <>
                    <Link to="/add-car" className="text-green-600 font-semibold hover:text-green-800 transition">+ Add Car</Link>
                    <Link to="/admin" className="text-purple-600 font-semibold hover:text-purple-800 transition">Admin</Link>
                  </>
                )}

                <span className="text-sm text-gray-400">{user?.name}</span>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 transition">Login</Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}