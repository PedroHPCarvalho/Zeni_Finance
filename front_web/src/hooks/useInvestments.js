// hooks/useInvestments.js
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

        console.log("API INVEST DATA:", data);

        if (!Array.isArray(data)) {
          setInvestments([]);
          return;
        }

        let carteira = 0;

        const processed = data.map((item) => {
          const aportes = Number(item.totalAportes) || 0;
          const retiradas = Number(item.totalResultados) || 0;

          carteira += aportes - retiradas;

          return {
            mes: item.mes,
            ano: item.ano,
            aportes,
            retiradas,
            carteira,
          };
        });

        console.log("INVEST PROCESSED:", processed);

        setInvestments(processed);
      } catch (err) {
        console.error("Erro ao carregar investimentos:", err);
        setError(err);
        setInvestments([]);
      } finally {
        setLoading(false);
      }
    }

    fetchInvestments();
  }, [headers]);

  return { investments, loading, error };
}
