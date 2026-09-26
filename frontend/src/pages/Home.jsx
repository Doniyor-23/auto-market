import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const BACKEND_URL = import.meta.env.VITE_API_URL.replace("/api", "");
const resolveImage = (img) => {
  if (!img) return "https://placehold.co/600x400?text=No+Image";
  if (img.startsWith("http")) return img;
  return `${BACKEND_URL}${img}`;
};

export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await api.get("/cars");
        setCars(res.data.cars.slice(0, 6));
      } catch (err) {
        // xato bo'lsa ham Home ishlashda davom etadi
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  return (
    <div>
      <div className="bg-blue-600 text-white text-center py-16 px-4">
        <h1 className="text-4xl font-bold mb-3">AUTO MARKET</h1>
        <p className="text-blue-100 mb-6">O'zbekistondagi ishonchli mashina bozori</p>
        <Link to="/cars" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
          Barcha mashinalarni ko'rish
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">So'nggi e'lonlar</h2>

        {loading ? (
          <p className="text-gray-500">Yuklanmoqda...</p>
        ) : cars.length === 0 ? (
          <p className="text-gray-400">Hozircha mashinalar yo'q</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <Link key={car._id} to={`/cars/${car._id}`} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                <img src={resolveImage(car.images?.[0])} alt={`${car.brand} ${car.model}`} className="w-full h-44 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800">{car.brand} {car.model}</h3>
                  <p className="text-gray-500 text-sm">{car.year}</p>
                  <p className="text-blue-600 font-bold mt-1">${car.price?.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}