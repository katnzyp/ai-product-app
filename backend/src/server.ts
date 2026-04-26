import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth";
import { authMiddleware } from "./middleware/auth";
import productRoutes from "./routes/product";
import aiRoutes from "./routes/ai";




dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "You are authorized!" });
});
// app.post("/api/auth/signup", (req, res) => {
//   res.send("Direct route working");
// });

// app.get("/check123", (req, res) => {
//   res.send("THIS IS MY CURRENT SERVER");
// });


app.use("/api/products", productRoutes);

app.use("/api/ai", aiRoutes);

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB connected"))
//   .catch(() => console.log("DB connection error"));
.catch((err) => console.log("DB error:", err.message));

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port 5000");
});