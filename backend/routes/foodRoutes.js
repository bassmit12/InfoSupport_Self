import express from "express";
import {
  createFood,
  getFoodFeed,
  getItemInfo,
  getCart,
  putItemInCart,
} from "../controller/foodController.js";

const router = express.Router();

router.get("/feed", getFoodFeed);
router.get("/item/:id", getItemInfo);
router.get("/getCart", getCart);

router.post("/createFood", createFood);
router.post("/putItemInCart/:id", putItemInCart);

export default router;
