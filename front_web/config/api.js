import axios from "axios";

// ✅ baseURL relativa — vai pelo Nginx
const api = axios.create({
  baseURL: "/", // o nginx já faz o proxy
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Endpoints centralizados
export const API_ENDPOINTS = {
  register: "auth/register",
  login: "auth/login",
  me: "me",
  resumeCards: "financial-registers-bff/resumecards",
  categoryResume: "financial-registers-bff/categoryresume",
  mouthResume: "financial-registers-bff/mouthresume",
  mouthResumeInvest: "financial-registers-bff/mouthresumeinvest",
  createWithN8N: "financial-registers-bff/create/ia",
};

export default api;
