export function useAuthToken(){
  const token = localStorage.getItem("token");
  return token ? {Authorization: `Bearer ${token}`} : {};
}