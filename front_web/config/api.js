import axios from "axios";

const api = axios.create({
  baseURL: "/", // usa o nginx em produção ou o proxy do Vite em dev
  headers: {
    "Content-Type": "application/json",
  },
});

export const API_ENDPOINTS = {
  register: "/auth/register",
  login: "/auth/login",
  me: "/me",
  financialRegisters: "/financial-registers-bff",
  resumeCards: "/financial-registers-bff/resumecards",
  categoryResume: "/financial-registers-bff/categoryresume",
  mouthResume: "/financial-registers-bff/mouthresume",
  mouthResumeInvest: "/financial-registers-bff/mouthresumeinvest",
  createWithN8N: "/financial-registers-bff/create/ia",
  listPaged: "/financial-registers-bff/listPaged",
  aiCreate: "/financial-registers-bff/create/ia",
  createManual: "/financial-registers-bff/create/",
};

export default api;
