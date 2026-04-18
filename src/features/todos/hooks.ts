import { useQuery } from "@tanstack/react-query";
import { api } from "./api";
import { useAuth } from "../../context/AuthContext";

export function useTasks(page: number, search: string, status = "all") {
    const { token } = useAuth();  

  return useQuery({
    queryKey: ["tasks", page, search, status],
    queryFn: async () => {
      const response = await api.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          search,
          status: status === "all" ? undefined : status,
        },
      });
      return response.data;
    },
    enabled: !!token,
  });
}
