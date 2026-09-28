import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

// O'zingizning Telegram username'ingizni yozing (@ belgisiz)
const TELEGRAM_USERNAME = "ramazonovvvvv";

const BACKEND_URL = import.meta.env.VITE_API_URL.replace("/api", "");
const resolveImage = (img) => {
  if (!img) return "https://placehold.co/800x500?text=No+Image";
  if (img.startsWith("http")) return img;
  return `${BACKEND_URL}${img}`;
};

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const fetchCar = async () => {
    try {
      const res = await api.get(`/cars/${id}`);
      setCar(res.data.car);
    } catch (err) {
      setError("Mashina topilmadi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCar();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm("Haqiqatan ham bu mashinani o'chirmoqchimisiz?");
    if (!confirmed) return;

    setDeleting(true);
    try {
      await api.delete(`/cars/${id}`);
      navigate("/cars");
    } catch (err) {
      setError("O'chirishda xatolik yuz berdi");
      setDeleting(false);
    }
  };

  if (loading) {
    return <p className="text-center py-16 text-gray-500">Yuklanmoqda...</p>;
  }

  if (error || !car) {
    return <p className="text-center py-16 text-red-600">{error || "Mashina topilmadi"}</p>;
  }

  const images = car.images && car.images.length > 0 ? car.images : [null];

  // Telegram uchun tayyor xabar
  const message =
    `Salom! Men ${car.brand} ${car.model} (${car.year}) mashinasini sotib olmoqchiman.\n` +
    `Narxi: $${car.price?.toLocaleString()}\n` +
    `Havola: ${window.location.href}`;
  const telegramLink = `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(message)}`;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center">
        <Link to="/cars" className="text-blue-600 hover:underline text-sm">
          ← Ortga
        </Link>

        {isAdmin && (
          <div className="flex gap-2">
            <Link
              to={`/cars/${id}/edit`}
              className="bg-yellow-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-yellow-600 transition"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-red-600 transition disabled:bg-red-300"
            >
              {deleting ? "O'chirilmoqda..." : "Delete"}
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        <div>
          <img
            src={resolveImage(images[activeImage])}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-80 object-cover rounded-xl shadow"
          />
          {images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={resolveImage(img)}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-16 object-cover rounded cursor-pointer border-2 ${
                    activeImage === idx ? "border-blue-600" : "border-transparent"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {car.brand} {car.model}
          </h1>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            ${car.price?.toLocaleString()}
          </p>

          <div className="grid grid-cols-2 gap-3 mt-6 text-sm">
            <p><span className="text-gray-500">Yil:</span> <span className="font-medium">{car.year}</span></p>
            <p><span className="text-gray-500">Probeg:</span> <span className="font-medium">{car.mileage?.toLocaleString()} km</span></p>
            <p><span className="text-gray-500">Yoqilg'i:</span> <span className="font-medium">{car.fuelType}</span></p>
            <p><span className="text-gray-500">Uzatma:</span> <span className="font-medium">{car.transmission}</span></p>
            <p><span className="text-gray-500">Rang:</span> <span className="font-medium">{car.color || "—"}</span></p>
            <p><span className="text-gray-500">Manzil:</span> <span className="font-medium">{car.location || "—"}</span></p>
          </div>

          {car.description && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-700 mb-1">Tavsif</h3>
              <p className="text-gray-600">{car.description}</p>
            </div>
          )}

          
          <a  href={telegramLink}
            target="_blank"
            rel="noreferrer"
            className="mt-8 flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
            Sotib olish (Telegram)
          </a>
        </div>
      </div>
    </div>
  );
}