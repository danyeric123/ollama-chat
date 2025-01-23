import { useQuery } from "@tanstack/react-query";
import { fetchModels } from "@/services/api";

export const useModels = () => {
  return useQuery({
    queryKey: ["models"],
    queryFn: fetchModels,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
};
