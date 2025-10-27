import { useState } from "react";
import { API_ENDPOINTS } from "../../config/api.js";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (formData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_ENDPOINTS.login,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)  
      });

      const result = await response.json();
      return { ok: response.ok, result};
      
    } catch (error) {
      setError(error.message)
      return { ok: false};
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error};
}