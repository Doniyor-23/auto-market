import express from "express";
import {
  getCars, getCarById, createCar, updateCar, deleteCar,
} from "../controllers/carController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getCars);
router.get("/:id", getCarById);

router.post("/", protect, isAdmin, upload.array("images", 5), createCar);
router.put("/:id", protect, isAdmin, upload.array("images", 5), updateCar);
router.delete("/:id", protect, isAdmin, deleteCar);

export default router;