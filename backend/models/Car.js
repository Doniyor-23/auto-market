import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    mileage: { type: Number, default: 0 },
    fuelType: {
      type: String,
      enum: ["petrol", "diesel", "electric", "hybrid", "gas"],
      default: "petrol",
    },
    transmission: {
      type: String,
      enum: ["manual", "automatic"],
      default: "automatic",
    },
    color: { type: String, default: "" },
    location: { type: String, default: "" },
    description: { type: String, default: "" },
    images: [{ type: String }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);
export default Car;