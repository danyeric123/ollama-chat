import { useQuery } from "@tanstack/react-query";

const checkOllamaConnection = async () => {
  try {
    const response = await fetch("http://localhost:11434/api/tags");
    if (!response.ok) throw new Error("Ollama service not responding");
    return true;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to connect to local Ollama instance");
  }
};

export const useCheckOllama = () => {
  return useQuery({
    queryKey: ["ollama-check"],
    queryFn: checkOllamaConnection,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
