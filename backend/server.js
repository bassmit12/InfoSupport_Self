import express from "express";
import dotenv from "dotenv";
import connectDB from "../backend/db/connectDB.js";
import cookieParser from "cookie-parser";
import foodRoutes from "./routes/foodRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cors from "cors";

import http from "http"; // Import the 'http' module
import { Server } from "socket.io"; // Import the 'Server' class

dotenv.config();
connectDB();
const app = express();

const server = http.createServer(app); // Create an HTTP server

const io = new Server(server); // Assuming you have httpServer created

app.set("socketio", io); // Set the io instance as part of the app for access in controllers

export { io }; // Create a new instance of the Socket.IO server

const PORT = process.env.PORT || 5002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // Adjust the origin to match your React app
    credentials: true,
  })
);

app.use("/api/food", foodRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/users", userRoutes);
app.use("/api/order", orderRoutes);

app.get("/", (req, res) => {
  res.send("Infosupport backend server 3");
});

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);

// Add a WebSocket connection event
io.on("connection", (socket) => {
  console.log("A user connected");

  // Example: Listen for a stock update event and broadcast it to all clients
  socket.on("stockUpdate", (data) => {
    io.emit("stockUpdate", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
