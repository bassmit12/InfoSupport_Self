// foodController.test.js

import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import express from "express";
import foodRoutes from "../../routes/foodRoutes";
import { createFood, getFoodFeed } from "../../controller/foodController";

// Create an instance of express app
const app = express();

// Use middleware necessary for the routes to work
app.use(express.json());
app.use("/api/food", foodRoutes);

// Setting up mock server
const mongoServer = new MongoMemoryServer();

beforeAll(async () => {
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Food Controller", () => {
  describe("getFoodFeed", () => {
    it("should retrieve food items", async () => {
      const res = await request(app).get("/api/food/feed");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });

  describe("createFood", () => {
    it("should create a new food item", async () => {
      const foodData = {
        name: "Test Burger",
        descriptionLong: "A long description for Test Burger",
        descriptionShort: "A short description",
        price: 9.99,
        category: "Lunch",
        imageURL: "http://example.com/burger.jpg",
        ingredients: ["Bread", "Beef", "Lettuce"],
        dietaryInfo: "Gluten-free",
      };

      const res = await request(app)
        .post("/api/food/createFood")
        .send(foodData);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty(
        "message",
        "Food Item created successfully"
      );
      expect(res.body.newFood).toHaveProperty("_id");
      expect(res.body.newFood.name).toEqual(foodData.name);
    });

    it("should not create food item with missing required fields", async () => {
      const res = await request(app)
        .post("/api/food/createFood")
        .send({ name: "Incomplete Burger" });

      expect(res.statusCode).toEqual(400);
    });
  });
});
