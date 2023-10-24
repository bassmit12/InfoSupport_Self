import express from "express";
import dotenv from "dotenv";
import connectDB from "../backend/db/connectDB.js";
import cookieParser from "cookie-parser";
import foodRoutes from "./routes/foodRoutes.js";

dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/food", foodRoutes);

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
