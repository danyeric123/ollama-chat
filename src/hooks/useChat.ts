import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { generateChatResponse } from "@/services/api";
import { Message } from "@/types";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const updateAssistantMessage = (content: string) => {
    setMessages((prev) => {
      const newMessages = [...prev];
      const lastMessage = newMessages[newMessages.length - 1];
      if (lastMessage?.role === "assistant") {
        lastMessage.content = content;
        return newMessages;
      }
      return [
        ...newMessages,
        {
          id: Date.now().toString(),
          role: "assistant",
          content,
          timestamp: Date.now(),
        },
      ];
    });
  };

  const handleStream = async (responseBody: ReadableStream<Uint8Array>) => {
    const reader = responseBody.getReader();
    const decoder = new TextDecoder();
    let assistantMessage = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n").filter(Boolean);

      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          assistantMessage += parsed.response;
          updateAssistantMessage(assistantMessage);
        } catch (error) {
          console.error("Failed to parse JSON:", error);
        }
      }
    }
  };

  const mutation = useMutation({
    mutationFn: generateChatResponse,
    onMutate: async (variables) => {
      const newMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: variables.prompt,
        timestamp: Date.now(),
      };
      addMessage(newMessage);
    },
    onSuccess: async (responseBody) => {
      if (!responseBody) {
        throw new Error("No response body");
      }
      await handleStream(responseBody);
    },
    onError: (error) => {
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "error",
        content: "Error generating response: " + error.message,
        timestamp: Date.now(),
      };
      addMessage(errorMessage);
    },
  });

  return {
    messages,
    sendMessage: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
