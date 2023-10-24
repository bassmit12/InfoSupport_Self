import express from "express";
import { createFood, getFoodFeed } from "../controller/foodController.js";

const router = express.Router();

router.get("/feed", getFoodFeed);
router.post("/createFood", createFood);

export default router;
