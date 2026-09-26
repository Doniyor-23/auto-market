// Bu middleware "protect" dan KEYIN ishlatiladi (route'da: protect, isAdmin, controller)
// protect allaqachon req.user ni joylashtirgan bo'ladi, biz shunchaki role'ni tekshiramiz.
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }

  return res.status(403).json({ message: "Ruxsat yo'q: faqat admin uchun" });
};
