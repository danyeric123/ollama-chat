// Chat.tsx
import { useState, useRef, useEffect } from "react";
import { useModels } from "@/hooks/useModels";
import { useChat } from "@/hooks/useChat";
import { useCheckOllama } from "@/hooks/useCheckOllama";
import { ModelSelector } from "@/components/ModelSelector";
import { Message } from "@/components/Message";
import { ChatInput } from "@/components/ChatInput";
import { ErrorDisplay } from "@/components/ErrorDisplay";

export const OllamaChat = () => {
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { isError: isConnectionError, refetch: retryConnection } = useCheckOllama();

  const {
    data: models,
    isLoading: isModelLoading,
    isError: isModelError,
  } = useModels();

  const { messages, sendMessage, isLoading } = useChat();

  useEffect(() => {
    if (models?.length > 0 && !selectedModel) {
      setSelectedModel(models[0].name);
    }
  }, [models]);

  if (isConnectionError || isModelError) {
    return <ErrorDisplay onRetry={() => retryConnection()} />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ model: selectedModel, prompt: input });
    setInput("");
  };

  return (
    <div className="chat-container">
      <ModelSelector
        selectedModel={selectedModel}
        models={models}
        isLoading={isModelLoading}
        onModelChange={setSelectedModel}
      />

      <div className="messages-container">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <p>Connected to local Ollama instance</p>
            <p className="text-sm">Start a conversation to begin</p>
          </div>
        )}
        {messages.map((message) => (
          <Message
            key={message.id}
            role={message.role}
            content={message.content}
            timestamp={message.timestamp}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        input={input}
        isLoading={isLoading}
        isModelLoading={isModelLoading}
        onSubmit={handleSubmit}
        onInputChange={setInput}
      />
    </div>
  );
};