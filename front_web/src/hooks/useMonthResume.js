import { useEffect, useState } from "react";
import { useAuthToken } from "./useUser";
import api, { API_ENDPOINTS } from "../../config/api";

export function useMonthResume(){
  const [monthResume, setMonthResume] = useState([]);
  const headers = useAuthToken();

  useEffect(() =>{
    async function fetchResumeMonth() {
      try{
        const response = await api.get(API_ENDPOINTS.mouthResume, { headers });
        console.log("monthResume -> response.data:", response.data);
        if(Array.isArray(response.data)){
          setMonthResume(response.data);
        } else {
          console.warn("Resposta inesperada da API, retornando lista vazia");
          setMonthResume([]);
        } 
      } catch (err) {
        console.log("Erro ao carregar dados:", err);
        setMonthResume([]);
      }
    }
    fetchResumeMonth();
  }, []);
  return { monthResume };
}