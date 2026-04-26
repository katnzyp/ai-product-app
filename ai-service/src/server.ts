import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// AI analyze endpoint
app.get("/analyze", async (req, res) => {
  try {
    const token = req.headers.authorization;

    // call product service
    const response = // call product service
await axios.get("http://product-service:5002/api/products", {
  headers: { Authorization: req.headers.authorization },
});

    const products = response.data;

    if (!products.length) {
      return res.json({ message: "No products found" });
    }

    const prompt = `
Analyze these products and suggest the best one:

${products
  .map(
    (p: any) =>
      `Name: ${p.name}, Price: ${p.price}, Description: ${p.description}`
  )
  .join("\n")}
`;

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({
      insight: aiResponse.choices[0].message.content,
    });
  } catch (err) {
    res.status(500).json({ message: "AI error" });
  }
});

app.listen(5003, () => {
  console.log("AI service running on 5003");
});