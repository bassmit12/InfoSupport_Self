import express from "express";
import {
  createFood,
  getFoodFeed,
  getItemInfo,
  updateFood,
} from "../controller/foodController.js";

const router = express.Router();

router.get("/feed", getFoodFeed);
router.get("/item/:id", getItemInfo);
//router.put("/updateFood/:id", updateFood);
//router.post("/createFood", createFood);

export default router;
