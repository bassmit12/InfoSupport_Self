import express from "express";
import {
  addToCart,
  getCart,
  convertCartToOrder,
  removeFromCart, // Assuming you have this function
  updateCartQuantity, // Assuming you have this function
} from "../controller/cartController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

// Route to handle adding an item to the cart
router.post("/add-to-cart/:foodId", protectRoute, addToCart);

// Route to get the cart for a table
router.get("/:tableId/cart", protectRoute, getCart);

// Route to convert the cart into an order
router.post("/:tableId/checkout", protectRoute, convertCartToOrder);

// Route to remove an item from the cart
router.delete("/:tableId/cart/:itemId", protectRoute, removeFromCart);

// Route to update the quantity of an item in the cart
router.put("/:tableId/cart/:itemId", protectRoute, updateCartQuantity);

export default router;
