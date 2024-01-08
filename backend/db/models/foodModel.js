import mongoose, { mongo } from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    descriptionLong: {
      type: String,
      required: true,
    },
    descriptionShort: {
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
      enum: ["Vegetarian", "Vegan", "Gluten-free", ""],
      default: "",
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Food = mongoose.model("Food", foodSchema);

export default Food;
