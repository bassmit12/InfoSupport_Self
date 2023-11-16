import express from "express";
import {
  createFood,
  getFoodFeed,
  getItemInfo,
} from "../controller/foodController.js";

const router = express.Router();

router.get("/feed", getFoodFeed);
router.get("/item/:id", getItemInfo);

router.post("/createFood", createFood);

export default router;
