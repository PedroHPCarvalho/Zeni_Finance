import { useState } from "react";
import api, { API_ENDPOINTS } from "../../config/api";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (data) => {
    setLoading(true);
    setError(null);

    try {
      await api.post(API_ENDPOINTS.register, data);
      return { ok: true };
    } catch (err) {
      let msg = "Não foi possível concluir o cadastro. Verifique os dados e tente novamente.";

      if (err.response) {
        if (err.response.status === 400) {
          msg = "Dados inválidos. Verifique os campos e tente novamente.";
        } else if (err.response.status === 409) {
          msg = "Não foi possível concluir o cadastro. Verifique os dados e tente novamente."; // genérico
        }
      } else if (err.request) {
        msg = "Não foi possível conectar ao servidor. Tente novamente mais tarde.";
      }

      setError(msg);
      return { ok: false };
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, setError };
}
