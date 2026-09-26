import Car from "../models/Car.js";

export const getCars = async (req, res) => {
  try {
    const { brand, minPrice, maxPrice, search } = req.query;
    const filter = {};

    if (brand) filter.brand = new RegExp(brand, "i");
    if (search) {
      filter.$or = [
        { brand: new RegExp(search, "i") },
        { model: new RegExp(search, "i") },
      ];
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const cars = await Car.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ cars });
  } catch (error) {
    console.error("Get cars error:", error.message);
    return res.status(500).json({ message: "Server xatosi yuz berdi" });
  }
};

export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Mashina topilmadi" });
    }
    return res.status(200).json({ car });
  } catch (error) {
    console.error("Get car error:", error.message);
    return res.status(500).json({ message: "Server xatosi yuz berdi" });
  }
};

export const createCar = async (req, res) => {
  try {
    const {
      brand, model, year, price, mileage,
      fuelType, transmission, color, location, description,
    } = req.body;

    if (!brand || !model || !year || !price) {
      return res.status(400).json({
        message: "Brand, model, year va price to'ldirilishi shart",
      });
    }

    const imagePaths = req.files ? req.files.map((file) => `/uploads/${file.filename}`) : [];

    const car = new Car({
      brand, model, year, price, mileage, fuelType, transmission,
      color, location, description,
      images: imagePaths,
      createdBy: req.user._id,
    });

    await car.save();

    return res.status(201).json({ message: "Car added successfully", car });
  } catch (error) {
    console.error("Create car error:", error.message);
    return res.status(500).json({ message: "Server xatosi yuz berdi" });
  }
};

export const updateCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Mashina topilmadi" });
    }

    const fields = [
      "brand", "model", "year", "price", "mileage",
      "fuelType", "transmission", "color", "location", "description",
    ];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) car[field] = req.body[field];
    });

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => `/uploads/${file.filename}`);
      car.images = [...car.images, ...newImages];
    }

    await car.save();
    return res.status(200).json({ message: "Car updated successfully", car });
  } catch (error) {
    console.error("Update car error:", error.message);
    return res.status(500).json({ message: "Server xatosi yuz berdi" });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Mashina topilmadi" });
    }
    await car.deleteOne();
    return res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error("Delete car error:", error.message);
    return res.status(500).json({ message: "Server xatosi yuz berdi" });
  }
};