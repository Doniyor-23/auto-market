import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Car from "../models/Car.js";

dotenv.config();

const img = (id) => `https://images.unsplash.com/${id}?fm=jpg&q=70&w=1200&auto=format&fit=crop`;

const IMG_SEDAN_TEAL = img("photo-1533468659570-9cc9354310e4");
const IMG_SEDAN_BLACK_BMW = img("photo-1533239538464-b23ee39003da");
const IMG_TESLA = img("photo-1587304878428-1b533030e0e7");
const IMG_SUV_VOLVO = img("photo-1506244856291-8910ea843e81");
const IMG_CLASSIC_YELLOW = img("photo-1532937645515-9778bfbb099a");
const IMG_SEDAN_RED_WHITE = img("photo-1557845973-30a281c5987d");
const IMG_MERCEDES_WHITE = img("photo-1619881054883-3fdab04809b3");
const IMG_SPORTS_GRAY = img("photo-1627440829335-b42fba2a15dd");

const sampleCars = [
  { brand: "Chevrolet", model: "Cobalt", year: 2019, price: 8500, mileage: 65000, fuelType: "petrol", transmission: "manual", color: "White", location: "Tashkent", description: "Yaxshi holatda, birinchi egasi.", images: [IMG_SEDAN_TEAL] },
  { brand: "Chevrolet", model: "Nexia 3", year: 2020, price: 9200, mileage: 42000, fuelType: "petrol", transmission: "manual", color: "Silver", location: "Samarqand", description: "Toza salon, kam yurgan.", images: [IMG_SEDAN_RED_WHITE] },
  { brand: "Chevrolet", model: "Spark", year: 2018, price: 6800, mileage: 78000, fuelType: "petrol", transmission: "automatic", color: "Red", location: "Tashkent", description: "Shahar uchun qulay, tejamkor.", images: [IMG_CLASSIC_YELLOW] },
  { brand: "Chevrolet", model: "Malibu 2", year: 2021, price: 21000, mileage: 25000, fuelType: "petrol", transmission: "automatic", color: "Black", location: "Buxoro", description: "Bitta egasi, servis kitobi bor.", images: [IMG_SEDAN_BLACK_BMW] },
  { brand: "Toyota", model: "Camry", year: 2020, price: 24500, mileage: 38000, fuelType: "petrol", transmission: "automatic", color: "White", location: "Tashkent", description: "To'liq комплектация, kredit/muddatli to'lov mavjud.", images: [IMG_SEDAN_TEAL] },
  { brand: "Toyota", model: "Corolla", year: 2019, price: 17500, mileage: 52000, fuelType: "petrol", transmission: "automatic", color: "Gray", location: "Namangan", description: "Ishonchli, benzin sarfi kam.", images: [IMG_SEDAN_RED_WHITE] },
  { brand: "Toyota", model: "Prado", year: 2022, price: 58000, mileage: 15000, fuelType: "diesel", transmission: "automatic", color: "Black", location: "Tashkent", description: "Yangidek holat, kafolat bor.", images: [IMG_SUV_VOLVO] },
  { brand: "Hyundai", model: "Elantra", year: 2021, price: 19500, mileage: 30000, fuelType: "petrol", transmission: "automatic", color: "Blue", location: "Andijon", description: "Zamonaviy dizayn, xavfsizlik tizimlari to'liq.", images: [IMG_SEDAN_BLACK_BMW] },
  { brand: "Hyundai", model: "Tucson", year: 2020, price: 27500, mileage: 41000, fuelType: "petrol", transmission: "automatic", color: "White", location: "Tashkent", description: "Krossover, panoramik lyuk.", images: [IMG_SUV_VOLVO] },
  { brand: "Kia", model: "Sportage", year: 2021, price: 26800, mileage: 28000, fuelType: "petrol", transmission: "automatic", color: "Red", location: "Fargona", description: "To'liq privod, yangi shina.", images: [IMG_SUV_VOLVO] },
  { brand: "Kia", model: "Rio", year: 2019, price: 14200, mileage: 47000, fuelType: "petrol", transmission: "manual", color: "Silver", location: "Tashkent", description: "Ekonomik variant, tez sotiladi.", images: [IMG_CLASSIC_YELLOW] },
  { brand: "Lacetti", model: "Sedan", year: 2017, price: 7200, mileage: 92000, fuelType: "petrol", transmission: "manual", color: "Blue", location: "Xorazm", description: "Ehtiyot qism topish oson.", images: [IMG_SEDAN_TEAL] },
  { brand: "BMW", model: "3 Series", year: 2020, price: 34500, mileage: 33000, fuelType: "petrol", transmission: "automatic", color: "Black", location: "Tashkent", description: "Sport paket, charm salon.", images: [IMG_SPORTS_GRAY] },
  { brand: "Mercedes-Benz", model: "E-Class", year: 2019, price: 42000, mileage: 45000, fuelType: "diesel", transmission: "automatic", color: "Gray", location: "Tashkent", description: "Premium klass, to'liq xizmat tarixi.", images: [IMG_MERCEDES_WHITE] },
  { brand: "Tesla", model: "Model 3", year: 2022, price: 39500, mileage: 12000, fuelType: "electric", transmission: "automatic", color: "White", location: "Tashkent", description: "Elektromobil, autopilot funksiyasi bor.", images: [IMG_TESLA] },
];

const seedCars = async () => {
  await connectDB();

  try {
    let admin = await User.findOne({ role: "admin" });

    if (!admin) {
      console.log("⚠️  Admin user topilmadi. Avval: npm run seed:admin ishga tushiring.");
      process.exit(1);
    }

    const deleted = await Car.deleteMany({});
    if (deleted.deletedCount > 0) {
      console.log(`🗑️  ${deleted.deletedCount} ta eski mashina o'chirildi.`);
    }

    const carsWithOwner = sampleCars.map((car) => ({ ...car, createdBy: admin._id }));
    await Car.insertMany(carsWithOwner);

    console.log(`✅ ${carsWithOwner.length} ta mashina (haqiqiy rasmlar bilan) muvaffaqiyatli qo'shildi!`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Car seed xatosi:", error.message);
    process.exit(1);
  }
};

seedCars();