import express from "express";
import {
  getProfile,
  updateProfile,
  getAllUsers,
  updateUserById,
  deleteUserById,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// O'zining profili — har qanday login qilgan user
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

// Admin only — barcha userlarni boshqarish
router.get("/", protect, isAdmin, getAllUsers);
router.put("/:id", protect, isAdmin, updateUserById);
router.delete("/:id", protect, isAdmin, deleteUserById);

export default router;
