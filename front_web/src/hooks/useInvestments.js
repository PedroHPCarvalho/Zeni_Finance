import { useEffect, useState } from "react";
import { useAuthToken } from "./useUser";
import api, { API_ENDPOINTS } from "../../config/api";

export function useInvestments() {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const headers = useAuthToken();

  useEffect(() => {
    if (!headers || !headers.Authorization) return;

    async function fetchInvestments() {
      try {
        const { data } = await api.get(API_ENDPOINTS.mouthResumeInvest, {
          headers,
        });

        // garante array
        setInvestments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erro ao carregar investimentos:", err);
        setError("Erro ao carregar investimentos");
        setInvestments([]);
      } finally {
        setLoading(false);
      }
    }

    fetchInvestments();
  }, [headers]);

  return { investments, loading, error };
}
