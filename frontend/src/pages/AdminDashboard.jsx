import { useState, useEffect } from "react";
import api from "../api/axios";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [editingUser, setEditingUser] = useState(null); // hozir tahrirlanayotgan user
  const [editForm, setEditForm] = useState({ name: "", role: "user" });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users");
      setUsers(res.data.users);
    } catch (err) {
      setError("Userlar ro'yxatini olishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const startEdit = (user) => {
    setEditingUser(user._id);
    setEditForm({ name: user.name, role: user.role });
    setSuccessMsg("");
    setError("");
  };

  const cancelEdit = () => {
    setEditingUser(null);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveEdit = async (userId) => {
    try {
      await api.put(`/users/${userId}`, editForm);
      setSuccessMsg("User yangilandi");
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      setError("Userni yangilashda xatolik yuz berdi");
    }
  };

  const handleDelete = async (userId) => {
    const confirmed = window.confirm("Haqiqatan ham bu userni o'chirmoqchimisiz?");
    if (!confirmed) return;

    try {
      await api.delete(`/users/${userId}`);
      setSuccessMsg("User o'chirildi");
      fetchUsers();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Userni o'chirishda xatolik yuz berdi");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
      <p className="text-gray-500 mb-6">Foydalanuvchilarni boshqarish</p>

      {successMsg && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">{successMsg}</div>
      )}
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>
      )}

      {loading ? (
        <p className="text-gray-500">Yuklanmoqda...</p>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t border-gray-100">
                  <td className="px-4 py-3">
                    {editingUser === u._id ? (
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleEditChange}
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                      />
                    ) : (
                      u.name
                    )}
                  </td>
                  <td className="px-4 py-3">{u.username}</td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3">
                    {editingUser === u._id ? (
                      <select
                        name="role"
                        value={editForm.role}
                        onChange={handleEditChange}
                        className="border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    ) : (
                      <span
                        className={
                          u.role === "admin"
                            ? "text-purple-600 font-semibold"
                            : "text-gray-600"
                        }
                      >
                        {u.role}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    {editingUser === u._id ? (
                      <>
                        <button
                          onClick={() => saveEdit(u._id)}
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(u)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(u._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <p className="text-center text-gray-400 py-6">Hozircha userlar yo'q</p>
          )}
        </div>
      )}
    </div>
  );
}
