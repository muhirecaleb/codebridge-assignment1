import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const register = (userData) => api.post("/auth/register", userData);

export const login = (credentials) => api.post("/auth/login", credentials);

export const getApiErrorMessage = (error) =>
  error.response?.data?.message || "Something went wrong. Please try again.";

export const saveAuth = ({ user, token }) => {
  localStorage.setItem("codebridgeUser", JSON.stringify(user));
  localStorage.setItem("codebridgeToken", token);
};
