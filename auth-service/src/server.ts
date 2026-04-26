import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", authRoutes);

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log("Auth DB connected"));

app.listen(5001, () => {
  console.log("Auth service running on 5001");
});