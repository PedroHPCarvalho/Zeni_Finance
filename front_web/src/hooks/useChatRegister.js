import { useState } from "react";
import { useAuthToken } from "./useUser";
import api, { API_ENDPOINTS } from "../../config/api";

export function useChatRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const headers = useAuthToken();

  async function sendToIA(userString) {
    if (!userString.trim() || !headers?.Authorization) return false;

    setLoading(true);
    setError(null);

    try {
      await api.post(API_ENDPOINTS.aiCreate, { userString }, { headers });
      return true; // sucesso
    } catch (err) {
      console.error("Erro ao enviar IA:", err);
      setError("Erro ao processar mensagem para IA");
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { sendToIA, loading, error };
}
