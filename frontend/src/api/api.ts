import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const setToken = (token: string) => {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const loadToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    setToken(token);
  }
};