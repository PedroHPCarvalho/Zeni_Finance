import { useEffect, useState } from "react";
import api, { API_ENDPOINTS } from "../../config/api";
import { useAuthToken } from "./useUser";

export function useCards() {
  const [dataCards, setData] = useState({
    sumEntry: 0,
    sumExit: 0,
    balanceNow: 0,
  });

  const headers = useAuthToken();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(API_ENDPOINTS.resumeCards, { headers });
        // Se vier vazio, mantém zerado
        setData(response.data || { sumEntry: 0, sumExit: 0, balanceNow: 0 });
      } catch (err) {
        console.warn("⚠️ Nenhum dado encontrado, exibindo zeros.");
        // fallback padrão em caso de erro
        setData({ sumEntry: 0, sumExit: 0, balanceNow: 0 });
      }
    }

    fetchData();
  }, []);

  return { dataCards };
}