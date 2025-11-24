// useMe.js
import { useState, useEffect } from "react";
import { useAuthToken } from "./useUser";
import api, { API_ENDPOINTS } from "../../config/api";

export function useMe() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const headers = useAuthToken(); // seguro: sempre chama hooks na mesma ordem

  useEffect(() => {
    let mounted = true;

    async function fetchUser() {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (!token) {
        if (mounted) {
          setError("Token não encontrado");
          setLoading(false);
        }
        return;
      }

      try {
        const res = await api.get(API_ENDPOINTS.me, { headers });
        if (mounted) setUser(res.data);
      } catch (err) {
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchUser();

    return () => {
      mounted = false;
    };
  }, [headers]);

  return { user, loading, error };
}
