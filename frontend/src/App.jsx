import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import MyCars from "./pages/MyCars";
import AddCar from "./pages/AddCar";
import EditCar from "./pages/EditCar";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
        <Route path="/my-cars" element={<ProtectedRoute><MyCars /></ProtectedRoute>} />

        {/* Faqat ADMIN */}
        <Route path="/add-car" element={<AdminRoute><AddCar /></AdminRoute>} />
        <Route path="/cars/:id/edit" element={<AdminRoute><EditCar /></AdminRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      </Routes>
    </MainLayout>
  );
}

export default App;