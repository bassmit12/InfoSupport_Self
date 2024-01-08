import Food from "../models/foodModel.js";

const getFoodFeed = async () => {
  try {
    const foodItems = await Food.find();
    return foodItems;
  } catch (error) {
    throw error;
  }
};

const createFood = async ({
  name,
  descriptionLong,
  descriptionShort,
  price,
  category,
  imageURL,
  ingredients,
  dietaryInfo,
  stock,
}) => {
  try {
    const maxLengthDescriptionLong = 1000;
    if (descriptionLong.length > maxLengthDescriptionLong) {
      throw new Error(
        `Description must be less than ${maxLengthDescriptionLong} characters`
      );
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
      stock,
    });

    await newFood.save();
    return newFood;
  } catch (error) {
    throw error;
  }
};

const getItemInfo = async (foodId) => {
  try {
    const foodItem = await Food.findById(foodId);
    if (!foodItem) {
      throw new Error("Food item not found");
    }
    return foodItem;
  } catch (error) {
    if (error.kind === "ObjectId") {
      throw new Error("Invalid food id format");
    }
    throw error;
  }
};

const updateFood = async (foodId, updatedFields) => {
  try {
    const food = await Food.findByIdAndUpdate(foodId, updatedFields, {
      new: true,
    });
    if (!food) {
      throw new Error("Food item not found");
    }
    return food;
  } catch (error) {
    if (error.kind === "ObjectId") {
      throw new Error("Invalid food id format");
    }
    throw error;
  }
};

export { getFoodFeed, createFood, getItemInfo, updateFood };
