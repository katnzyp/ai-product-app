import { useState } from "react";
import { API } from "../api/api";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [insight, setInsight] = useState("");

  const getProducts = async () => {
    try {
      const res = await API.get("/api/products");
      setProducts(res.data);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to fetch products");
    }
  };

  const analyze = async () => {
    try {
      const res = await API.get("/api/ai/analyze");
      setInsight(res.data.insight);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to analyze");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>
      <button onClick={getProducts}>Get Products</button>
      <button onClick={analyze}>Analyze</button>

      <pre>{JSON.stringify(products, null, 2)}</pre>
      <p>{insight}</p>
    </div>
  );
}