import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

// Auth → 5001
app.use(
  "/api/auth",
  createProxyMiddleware({
    target: "http://auth-service:5001",
    changeOrigin: true,
  })
);

// Products → 5002
app.use(
  "/api/products",
  createProxyMiddleware({
    target: "http://product-service:5002",
    changeOrigin: true,
  })
);

// AI → 5003
app.use(
  "/api/ai",
  createProxyMiddleware({
    target: "http://ai-service:5003",
    changeOrigin: true,
  })
);

app.listen(5000, () => {
  console.log("Gateway running on port 5000");
});