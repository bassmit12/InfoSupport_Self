// foodController.test.js
import { mockFoodId, mockFood } from "./foodControllerMocks";
import * as FoodController from "../../../controller/foodController";

describe("Food Controller", () => {
  describe("getFoodFeed", () => {
    test("should get food feed", async () => {
      const req = {};
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await FoodController.getFoodFeed(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([mockFood]);
    });
  });

  describe("createFood", () => {
    test("should create food item", async () => {
      const req = {
        body: {
          name: "New Food",
          descriptionLong: "New description",
          descriptionShort: "New short description",
          price: 15,
          category: "Dinner",
          imageURL: "new-image-url",
          ingredients: ["new-ingredient"],
          dietaryInfo: "Vegan",
        },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await FoodController.createFood(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Food Item created successfully",
        newFood: expect.objectContaining({
          name: "New Food",
          descriptionLong: "New description",
          descriptionShort: "New short description",
          price: 15,
          category: "Dinner",
          imageURL: "new-image-url",
          ingredients: ["new-ingredient"],
          dietaryInfo: "Vegan",
        }),
      });
    });
  });

  describe("getItemInfo", () => {
    test("should get food item info", async () => {
      const req = {
        params: {
          id: mockFoodId,
        },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await FoodController.getItemInfo(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockFood);
    });
  });
});
