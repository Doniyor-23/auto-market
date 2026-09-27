import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const BACKEND_URL = import.meta.env.VITE_API_URL.replace("/api", "");
const resolveImage = (img) => {
  if (!img) return "https://placehold.co/200x150?text=No+Image";
  if (img.startsWith("http")) return img;
  return `${BACKEND_URL}${img}`;
};

export default function EditCar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    brand: "", model: "", year: "", price: "", mileage: "",
    fuelType: "petrol", transmission: "automatic",
    color: "", location: "", description: "",
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [newPreviews, setNewPreviews] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await api.get(`/cars/${id}`);
        const car = res.data.car;
        setFormData({
          brand: car.brand || "",
          model: car.model || "",
          year: car.year || "",
          price: car.price || "",
          mileage: car.mileage || "",
          fuelType: car.fuelType || "petrol",
          transmission: car.transmission || "automatic",
          color: car.color || "",
          location: car.location || "",
          description: car.description || "",
        });
        setExistingImages(car.images || []);
      } catch (err) {
        setError("Mashina topilmadi");
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setNewImageFiles(files);
    setNewPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      newImageFiles.forEach((file) => {
        data.append("images", file);
      });

      await api.put(`/cars/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Mashina muvaffaqiyatli yangilandi!");
      setTimeout(() => navigate(`/cars/${id}`), 1200);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Server bilan bog'lanishda xatolik yuz berdi");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-center py-16 text-gray-500">Yuklanmoqda...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Car</h1>

      {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">{success}</div>}

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Brand</label>
            <input type="text" name="brand" value={formData.brand} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Model</label>
            <input type="text" name="model" value={formData.model} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Year</label>
            <input type="number" name="year" value={formData.year} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Price ($)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Mileage (km)</label>
            <input type="number" name="mileage" value={formData.mileage} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Color</label>
            <input type="text" name="color" value={formData.color} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Fuel Type</label>
            <select name="fuelType" value={formData.fuelType} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
              <option value="gas">Gas</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Transmission</label>
            <select name="transmission" value={formData.transmission} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        {existingImages.length > 0 && (
          <div>
            <label className="block text-gray-700 mb-1">Hozirgi rasmlar</label>
            <div className="flex gap-2 flex-wrap">
              {existingImages.map((img, idx) => (
                <img key={idx} src={resolveImage(img)} className="w-20 h-20 object-cover rounded-lg border" />
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-gray-700 mb-1">Yangi rasm qo'shish (ixtiyoriy, maksimum 5 ta)</label>
          <input type="file" accept="image/*" multiple onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          {newPreviews.length > 0 && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {newPreviews.map((src, idx) => (
                <img key={idx} src={src} className="w-20 h-20 object-cover rounded-lg border" />
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={saving}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300">
            {saving ? "Saqlanmoqda..." : "Save Changes"}
          </button>
          <button type="button" onClick={() => navigate(`/cars/${id}`)}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}