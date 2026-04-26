import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  userId: String, // who created it
});

const Product = mongoose.model("Product", productSchema);

export default Product;