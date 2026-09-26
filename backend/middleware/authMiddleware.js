import jwt from "jsonwebtoken";
import User from "../models/User.js";

// "protect" — faqat login qilgan (tokeni to'g'ri) foydalanuvchini o'tkazadi
export const protect = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Token topilmadi, ruxsat berilmadi" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User topilmadi" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({ message: "Token yaroqsiz yoki muddati tugagan" });
  }
};
