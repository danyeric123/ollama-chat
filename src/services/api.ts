import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:11434/api",
});

export const fetchModels = async () => {
  const { data } = await api.get("/tags");
  return data.models || [];
};

export const generateChatResponse = async ({
  model,
  prompt,
}: {
  model: string;
  prompt: string;
}) => {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model, prompt, stream: true }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate response");
  }

  return response.body;
};
