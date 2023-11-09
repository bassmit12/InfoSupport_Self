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

router.post("/add", protectRoute, addToCart);
router.get("/", protectRoute, getCart);
router.post("/convert-to-order", protectRoute, convertCartToOrder);
router.delete("/remove", protectRoute, removeFromCart);
router.put("/update-quantity", protectRoute, updateCartQuantity);

export default router;
