export interface Message {
  id: string;
  role: "user" | "assistant" | "error";
  content: string;
  timestamp: number;
}

export interface OllamaModel {
  name: string;
  modified_at: string;
  size: number;
}
