import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const BACKEND_URL = import.meta.env.VITE_API_URL.replace("/api", "");
const resolveImage = (img) => {
  if (!img) return "https://placehold.co/600x400?text=No+Image";
  if (img.startsWith("http")) return img;
  return `${BACKEND_URL}${img}`;
};

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchCars = async (query = "") => {
    setLoading(true);
    try {
      const res = await api.get(`/cars${query ? `?search=${query}` : ""}`);
      setCars(res.data.cars);
    } catch (err) {
      setError("Mashinalarni yuklashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCars(search);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Cars</h1>

      <form onSubmit={handleSearch} className="mb-8 flex gap-2 max-w-md">
        <input
          type="text"
          placeholder="Brand yoki model bo'yicha qidirish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Qidirish
        </button>
      </form>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {loading ? (
        <p className="text-gray-500">Yuklanmoqda...</p>
      ) : cars.length === 0 ? (
        <p className="text-gray-400">Hozircha mashinalar yo'q</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <Link key={car._id} to={`/cars/${car._id}`} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
              <img src={resolveImage(car.images?.[0])} alt={`${car.brand} ${car.model}`} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{car.brand} {car.model}</h2>
                <p className="text-gray-500 text-sm mb-2">{car.year} • {car.mileage?.toLocaleString()} km • {car.transmission}</p>
                <p className="text-blue-600 font-bold text-xl">${car.price?.toLocaleString()}</p>
                <p className="text-gray-400 text-sm mt-1">{car.location}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}