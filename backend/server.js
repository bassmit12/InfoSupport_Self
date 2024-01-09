import express from "express";
import dotenv from "dotenv";
import connectDB from "../backend/db/connectDB.js";
import cookieParser from "cookie-parser";
import foodRoutes from "./routes/foodRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/food", foodRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/users", userRoutes);
app.use("/api/order", orderRoutes);

app.get("/", (req, res) => {
  res.send("Infosupport backend server");
});

app.get("/ping", (req, res) => {
  res.send("pong 🏓");
});

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
