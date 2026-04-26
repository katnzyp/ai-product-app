import { useState } from "react";
import { API, setToken } from "../api/api";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      const res = await API.post("/api/auth/login", { email, password });
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login error");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <input 
        placeholder="Email" 
        value={email}
        onChange={e => setEmail(e.target.value)} 
      />
      <br /><br />
      <input 
        placeholder="Password" 
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)} 
      />
      <br /><br />
      <button onClick={handleLogin}>Login</button>
      <br /><br />
      <button onClick={() => navigate("/signup")}>
        Go to Signup
      </button>
    </div>
  );
}