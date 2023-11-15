import Food from "../db/models/foodModel.js";

const getFoodFeed = async (req, res) => {
  try {
    const foodItems = await Food.find();
    res.status(200).json(foodItems);
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
        message:
          "Please provide all fields (Name, DescriptionLong, DescriptionShort, Price, Category and imageURL are all required)",
      });
    }

    const maxLengthDescriptionLong = 1000;
    if (descriptionLong.length > maxLengthDescriptionLong) {
      return res.status(400).json({
        message: `Description must be less than ${maxLengthDescriptionLong} characters`,
      });
    }

    const newFood = new Food({
      name,
      descriptionLong,
      descriptionShort,
      price,
      category,
      imageURL,
      ingredients,
      dietaryInfo,
    });

    await newFood.save();
    res
      .status(201)
      .json({ message: "Food Item created successfully", newFood });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getItemInfo = async (req, res) => {
  try {
    const foodId = req.params.id;
    const foodItem = await Food.findById(foodId);
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }
    res.status(200).json(foodItem);
  } catch (error) {
    // If the error is due to an invalid object id format
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid food id format" });
    }
    return res.status(500).json({ message: error.message });
  }
};

const getCart = async (req, res) => {};

const putItemInCart = async (req, res) => {};

export { getFoodFeed, createFood, getItemInfo, getCart, putItemInCart };
