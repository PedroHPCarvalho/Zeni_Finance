import { useState, useEffect, useCallback } from "react";
import api, { API_ENDPOINTS } from "../../config/api";

export function usePaginatedFetch(numberPage = 0, sizeOfPage = 10) {
  const [dataRegistries, setData] = useState(null);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await api.get(
        `${API_ENDPOINTS.listPaged}?page=${numberPage}&size=${sizeOfPage}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      const result = response.data;

      // AGORA retorna o objeto inteiro
      setData(result);

      setTotalElements(result.totalElements || 0);
      setTotalPages(result.totalPages || 0);

    } catch (err) {
      console.error("Erro na requisição paginada:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [numberPage, sizeOfPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { dataRegistries, totalElements, totalPages, loading, error, refetch: fetchData };
}
