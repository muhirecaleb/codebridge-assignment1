import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const register = (userData) => api.post("/auth/register", userData);

export const login = (credentials) => api.post("/auth/login", credentials);

const authenticatedConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("codebridgeToken")}`,
  },
});

export const getCourses = () => api.get("/courses");

export const createCourse = (course) =>
  api.post("/courses/add", course, authenticatedConfig());

export const deleteCourse = (courseId) =>
  api.delete(`/courses/${courseId}`, authenticatedConfig());

export const getAdminDashboard = () =>
  api.get("/admin/dashboard", authenticatedConfig());

export const getMyCourses = () =>
  api.get("/enrollments/mine", authenticatedConfig());

export const enrollInCourse = (courseId) =>
  api.post("/enrollments", { course_id: courseId }, authenticatedConfig());

export const dropCourse = (courseId) =>
  api.delete(`/enrollments/${courseId}`, authenticatedConfig());

export const getApiErrorMessage = (error) =>
  error.response?.data?.message || "Something went wrong. Please try again.";

export const saveAuth = ({ user, token }) => {
  localStorage.setItem("codebridgeUser", JSON.stringify(user));
  localStorage.setItem("codebridgeToken", token);
};

export const getCurrentUser = () => {
  const savedUser = localStorage.getItem("codebridgeUser");

  if (!savedUser) {
    return null;
  }

  try {
    return JSON.parse(savedUser);
  } catch {
    localStorage.removeItem("codebridgeUser");
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("codebridgeUser");
  localStorage.removeItem("codebridgeToken");
};
