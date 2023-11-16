// foodControllerMocks.js
import * as FoodRepository from "../../../db/repository/foodRepository";

// Mocking the FoodRepository functions
jest.mock("../../../db/repository/foodRepository");

export const mockFoodId = "mockFoodId";
export const mockFood = {
  name: "Mock Food",
  descriptionLong: "Mock description",
  descriptionShort: "Mock short description",
  price: 10,
  category: "Lunch",
  imageURL: "mock-image-url",
  ingredients: ["ingredient1", "ingredient2"],
  dietaryInfo: "Vegetarian",
};

FoodRepository.getFoodFeed.mockImplementation(async () => {
  // Mock the implementation as needed
  return [mockFood];
});

FoodRepository.createFood.mockImplementation(async (foodData) => {
  // Mock the implementation as needed
  return {
    ...mockFood,
    ...foodData,
    _id: "mockFoodId",
  };
});

FoodRepository.getItemInfo.mockImplementation(async (foodId) => {
  // Mock the implementation as needed
  return mockFood;
});
