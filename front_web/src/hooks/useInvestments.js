import { useEffect, useState } from "react";
import { useAuthToken } from "./useUser";
import api, { API_ENDPOINTS } from "../../config/api";

export function useInvestments(){
  const [investments, setInvestments] = useState([]);
  const headers = useAuthToken();

  useEffect(() => {
    async function fetchInvestments() {
      try{
        const response = await api.get(API_ENDPOINTS.mouthResumeInvest, { headers });
        if(Array.isArray(response.data)){
          setInvestments(response.data);
        } else {
          console.warn("Resposta inesperada da API, retornando lista vazia");
          setInvestments([]);
        } 
      } catch (err) {
          console.log("Erro ao carregar investimentos:", err);
          setInvestments([]);
      }
    }
    fetchInvestments();
  }, []);
  return { investments };
}