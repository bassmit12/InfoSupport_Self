import * as FoodRepository from "../db/repository/foodRepository.js";

const getFoodFeed = async (req, res) => {
  try {
    const foodItems = await FoodRepository.getFoodFeed();
    res.status(200).json(foodItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFood = async (req, res) => {
  try {
    const {
      name,
      descriptionLong,
      descriptionShort,
      price,
      category,
      imageURL,
      ingredients,
      dietaryInfo,
    } = req.body;

    if (
      !name ||
      !descriptionLong ||
      !descriptionShort ||
      !price ||
      !category ||
      !imageURL
    ) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    const newFood = await FoodRepository.createFood({
      name,
      descriptionLong,
      descriptionShort,
      price,
      category,
      imageURL,
      ingredients,
      dietaryInfo,
    });

    res
      .status(201)
      .json({ message: "Food Item created successfully", newFood });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getItemInfo = async (req, res) => {
  try {
    const foodId = req.params.id;
    const foodItem = await FoodRepository.getItemInfo(foodId);
    res.status(200).json(foodItem);
  } catch (error) {
    if (error.message === "Invalid food id format") {
      return res.status(400).json({ message: "Invalid food id format" });
    }
    res.status(500).json({ message: error.message });
  }
};

export { getFoodFeed, createFood, getItemInfo };
