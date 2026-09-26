import User from "../models/User.js";

// GET /api/users/profile  (o'zi uchun)
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User topilmadi" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Get profile error:", error.message);
    return res.status(500).json({ message: "Server xatosi yuz berdi" });
  }
};

// PUT /api/users/profile  (o'zi uchun)
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User topilmadi" });
    }

    const { name, phone, location, avatar } = req.body;

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (location) user.location = location;
    if (avatar) user.avatar = avatar;

    await user.save();

    const updatedUser = await User.findById(user._id).select("-password");
    return res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Update profile error:", error.message);
    return res.status(500).json({ message: "Server xatosi yuz berdi" });
  }
};

// ============ ADMIN ONLY ============

// GET /api/users  — barcha userlar ro'yxati
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    return res.status(200).json({ users });
  } catch (error) {
    console.error("Get all users error:", error.message);
    return res.status(500).json({ message: "Server xatosi yuz berdi" });
  }
};

// PUT /api/users/:id  — admin istalgan userni tahrirlaydi (masalan role o'zgartirish)
export const updateUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User topilmadi" });
    }

    const { name, phone, location, role } = req.body;

    // MUHIM: admin o'zining rolini o'zi o'zgartira olmaydi
    // (aks holda tasodifan o'zini "user" qilib qo'yib, tizimdan qulflanib qolishi mumkin)
    if (role && String(user._id) === String(req.user._id) && role !== user.role) {
      return res.status(400).json({
        message: "O'zingizning rolingizni o'zgartira olmaysiz. Buni boshqa admin bajarishi kerak.",
      });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (location) user.location = location;
    if (role && ["user", "admin"].includes(role)) user.role = role;

    await user.save();

    const updatedUser = await User.findById(user._id).select("-password");
    return res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Admin update user error:", error.message);
    return res.status(500).json({ message: "Server xatosi yuz berdi" });
  }
};

// DELETE /api/users/:id  — admin userni o'chiradi
export const deleteUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User topilmadi" });
    }

    // Admin o'zini-o'zi o'chirib qo'ymasligi uchun kichik himoya
    if (String(user._id) === String(req.user._id)) {
      return res.status(400).json({ message: "O'zingizni o'chira olmaysiz" });
    }

    await user.deleteOne();
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Admin delete user error:", error.message);
    return res.status(500).json({ message: "Server xatosi yuz berdi" });
  }
};
