import express from "express";
import Product from "../models/Product";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();


// ✅ Create product
router.post("/", authMiddleware, async (req, res) => {
  const { name, price, description } = req.body;

  const userId = (req as any).user.id;

  const product = new Product({
    name,
    price,
    description,
    userId,
  });

  await product.save();

  res.json(product);
});


// ✅ Get all products
router.get("/", authMiddleware, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});


// ✅ Update product
router.put("/:id", authMiddleware, async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
});


// ✅ Delete product
router.delete("/:id", authMiddleware, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

export default router;