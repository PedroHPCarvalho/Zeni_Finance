import { useState } from "react";
import { useAuthToken } from "./useUser";
import api, { API_ENDPOINTS } from "../../config/api";

export function useChatRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const headers = useAuthToken();

  async function sendToIA(userString) {
    if (!headers || !headers.Authorization) {
      console.log("Token não encontrado");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const body = { userString };

      const response = await api.post(
        API_ENDPOINTS.aiCreate,
        body,
        { headers }
      );

      return response.data;  // 🔥 AGORA FUNCIONA
    } catch (err) {
      console.error("Erro ao enviar IA:", err);
      setError("Erro ao processar mensagem para IA");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { sendToIA, loading, error }; // 🔥 nome corrigido
}
