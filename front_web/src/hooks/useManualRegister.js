import { useState } from "react";
import { useAuthToken } from "./useUser";
import api, { API_ENDPOINTS } from "../../config/api";

export function useManualRegister(){
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const headers = useAuthToken();

  async function sendManualRegister(payload) {
    if(!headers || !headers.Authorization) {
      console.log("Token não encontrado")
      return null;
    }

    setLoading(true);
    setError(null);

    try{
      const response = await api.post(
        API_ENDPOINTS.createManual,
        payload,
        { headers }
      );

      return response.data;
    } catch (error) {
      console.error("Erro ao registrar Manualmente", error);
      setError("Erro ao registrar Manualmente");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { sendManualRegister, loading, error};
}