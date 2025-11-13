import { useEffect, useState } from "react";
import { useAuthToken } from "./useUser";
import api, { API_ENDPOINTS } from "../../config/api";

export function useCategory() {
  const [categories, setCategories] = useState([]);
  const headers = useAuthToken();

  useEffect(() => {
    async function fetchCategories() {
      try{
        const response = await api.get(API_ENDPOINTS.categoryResume, { headers });
        
        //Caso valido
        if (Array.isArray(response.data)){
          setCategories(response.data);
        } else {
          console.warn("⚠️ Resposta inesperada da API, retornando lista vazia");
          setCategories([]);
        }
      } catch (err) {
        console.error("❌ Erro ao carregar categorias:", err);
        setCategories([]); // fallback para evitar crash
      }
    }
    fetchCategories();
  }, []);
  return { categories };
}