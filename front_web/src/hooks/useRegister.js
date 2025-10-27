import { useState } from "react";
import { API_ENDPOINTS } from "../../config/api.js";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (formData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_ENDPOINTS.register, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      return { ok: response.ok, result };
      
    } catch (err) {
      setError(err.message);
      return { ok: false };
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
}
