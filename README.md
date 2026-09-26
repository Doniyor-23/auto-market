# AUTO MARKET

Car marketplace loyihasi — frontend (React + Vite + Tailwind) va backend (Node.js + Express + MongoDB) alohida papkalarda.

## Ishga tushirish

### 1. Backend
```bash
cd backend
npm install
npm run dev
```
Backend `http://localhost:4000` da ishga tushadi.

MongoDB kompyuteringizda ishlab turgan bo'lishi kerak (yoki `.env` dagi `MONGO_URI` ni o'zingizning MongoDB Atlas linkingizga almashtiring).

### 2. Default Admin Account yaratish
```bash
cd backend
npm run seed:admin
```
Bu skript quyidagi admin accountni yaratadi (agar hali mavjud bo'lmasa):
- Email: admin@automarket.com
- Username: admin
- Password: Admin123

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend `http://localhost:5173` da ishga tushadi.

## Loyiha bosqichlari (Steps)
- STEP 1: Boshlang'ich setup (frontend + backend skeleton)
- STEP 2: MongoDB + User model + Register API
- STEP 3: Login + JWT + Auth Middleware + Profile
- STEP 4: Admin role, Admin Middleware, Admin Users CRUD, AdminRoute, default admin seed

## Keyingi bosqich (STEP 5 taklif etiladi)
- Car modeli va Cars CRUD (Add Car, My Cars, Cars ro'yxati, Favorites)
- Admin panelda Cars boshqaruvi
