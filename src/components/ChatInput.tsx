import { KeyboardEvent } from "react";
import { Send, Loader2 } from "lucide-react";

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  isModelLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (value: string) => void;
}

export const ChatInput = ({
  input,
  isLoading,
  isModelLoading,
  onSubmit,
  onInputChange,
}: ChatInputProps) => {
  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <div className="input-container">
      <form onSubmit={onSubmit} className="flex gap-2">
        <textarea
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="chat-input"
          disabled={isLoading || isModelLoading}
        />
        <button
          type="submit"
          disabled={isLoading || isModelLoading || !input.trim()}
          className="send-button"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          Send
        </button>
      </form>
    </div>
  );
};
