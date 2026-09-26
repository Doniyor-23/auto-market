// Bu skript bitta marta ishga tushiriladi va default ADMIN accountni yaratadi.
// Ishlatish: npm run seed:admin  (backend papkasida)
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

const ADMIN_EMAIL = "doniyor@gmail.com";
const ADMIN_USERNAME = "Doniyor";
const ADMIN_PASSWORD = "Admin1234"; // faqat development uchun, keyin o'zgartiring

const seedAdmin = async () => {
  await connectDB();

  try {
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });

    if (existingAdmin) {
      console.log("ℹ️  Admin account allaqachon mavjud:", ADMIN_EMAIL);
      process.exit(0);
    }

    const admin = new User({
      name: "Admin",
      username: ADMIN_USERNAME,
      email: ADMIN_EMAIL,
      phone: "",
      password: ADMIN_PASSWORD, // User modelidagi pre('save') hook avtomatik hash qiladi
      role: "admin",
    });

    await admin.save();

    console.log("✅ Admin account yaratildi!");
    console.log("   Email:", ADMIN_EMAIL);
    console.log("   Username:", ADMIN_USERNAME);
    console.log("   Password:", ADMIN_PASSWORD);
    process.exit(0);
  } catch (error) {
    console.error("❌ Admin seed xatosi:", error.message);
    process.exit(1);
  }
};

seedAdmin();
