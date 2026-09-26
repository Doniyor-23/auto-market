import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Faqat role === "admin" bo'lgan user kira oladi.
// Login qilmagan bo'lsa -> /login, login qilgan lekin admin bo'lmasa -> "Access denied"
export default function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16 text-gray-500">
        Yuklanmoqda...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Access denied</h1>
        <p className="text-gray-500">Bu sahifaga faqat admin kira oladi.</p>
      </div>
    );
  }

  return children;
}
