import { useEffect, useState } from "react";
import { useAuthToken } from "./useUser";
import api, { API_ENDPOINTS } from "../../config/api";

export function useMonthResume() {
  const [monthResume, setMonthResume] = useState([]);
  const [loading, setLoading] = useState(true);
  const headers = useAuthToken();

  useEffect(() => {
    if (!headers) return;

    async function fetchResumeMonth() {
      try {
        const { data } = await api.get(API_ENDPOINTS.mouthResume, { headers });

        setMonthResume(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erro ao carregar mês:", err);
        setMonthResume([]);
      } finally {
        setLoading(false);
      }
    }

    fetchResumeMonth();
  }, [headers]);

  return { monthResume, loading };
}
