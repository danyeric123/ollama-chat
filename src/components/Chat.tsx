import { useState, useRef, useEffect } from "react";
import { useModels } from "@/hooks/useModels";
import { useChat } from "@/hooks/useChat";
import { ModelSelector } from "@/components/ModelSelector";
import { Message } from "@/components/Message";
import { ChatInput } from "@/components/ChatInput";
import { ErrorDisplay } from "@/components/ErrorDisplay";

export const OllamaChat = () => {
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  if (isModelError) {
    return <ErrorDisplay onRetry={() => window.location.reload()} />;
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
