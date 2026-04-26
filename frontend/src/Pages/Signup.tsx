import { useState } from "react";
import { API } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await API.post("/api/auth/signup", {
        email,
        password,
      });

      alert("Signup successful");
      navigate("/"); // go to login
    } catch (err: any) {
      alert(err.response?.data?.message || "Signup error");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Signup</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleSignup}>Signup</button>

      <br /><br />
      <button onClick={() => navigate("/")}>
        Go to Login
      </button>
    </div>
  );
}