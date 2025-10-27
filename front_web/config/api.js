//const API_BASE_URL = "/auth"; // relativo, vai usar o proxy
const API_BASE_URL =  "/auth/";
//process.env.REACT_APP_API_URL ||

export const API_ENDPOINTS = {
  register: `${API_BASE_URL}register`,
  login: `${API_BASE_URL}login`
};