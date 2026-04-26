import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/Product";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// app.use("/api/products", productRoutes);
app.use("/", productRoutes);

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log("Product DB connected"));

app.listen(5002, () => {
  console.log("Product service running on 5002");
});