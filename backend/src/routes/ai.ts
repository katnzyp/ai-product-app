import express from "express";
import OpenAI from "openai";
import Product from "../models/Product";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.get("/analyze", authMiddleware, async (req, res) => {
  try {
    const userId = (req as any).user.id;

    // get user's products
    const products = await Product.find({ userId });

    if (products.length === 0) {
      return res.json({ message: "No products found" });
    }

    // create prompt
    const prompt = `
Analyze these products and suggest the best one with reason:

${products
  .map(
    (p) =>
      `Name: ${p.name}, Price: ${p.price}, Description: ${p.description}`
  )
  .join("\n")}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({
      insight: response.choices[0].message.content,
    });
  } catch (err) {
    res.status(500).json({ message: "AI error" });
  }
});

export default router;