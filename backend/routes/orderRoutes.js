import express from "express";
import {
  getOrderFeed,
  getOrder,
  updateOrder,
  completeOrder,
} from "../controller/orderController.js";
import protectRoute from "../middlewares/protectRoute.js";

const orderRouter = express.Router();

// Get order feed
orderRouter.get("/", protectRoute, getOrderFeed);

// Get a specific order by ID
orderRouter.get("/:id", protectRoute, getOrder);

// Update an order
orderRouter.put("/update", protectRoute, updateOrder);

// Complete (delete) an order
orderRouter.delete("/complete", protectRoute, completeOrder);

export default orderRouter;
