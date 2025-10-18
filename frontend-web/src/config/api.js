<<<<<<< HEAD
const API_BASE_URL = "http://localhost:8000/auth"

export const API_ENDPOINTS = {
  register: `${API_BASE_URL}/register`,
  login: `${API_BASE_URL}/login`
=======
//const API_BASE_URL = "/auth"; // relativo, vai usar o proxy
const API_BASE_URL =  "http://localhost:8000/auth/";
//process.env.REACT_APP_API_URL ||

export const API_ENDPOINTS = {
  register: `${API_BASE_URL}register`,
  login: `${API_BASE_URL}login`
>>>>>>> 560cc00 (feat: Criação do Módulo de IA e ferramentas, Criação do endpoint para N8N)
};