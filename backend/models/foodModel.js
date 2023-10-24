import mongoose, { mongo } from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Breakfast", "Lunch", "Dinner"],
    },
    imageURL: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      default: [],
    },
    dietaryInfo: {
      type: String,
      required: true,
      enum: ["Vegetarian", "Vegan", "Gluten-free"],
    },
  },
  {
    timestamps: true,
  }
);

const Food = mongoose.model("Food", foodSchema);

export default Food;
