import ReactMarkdown from "react-markdown";

interface MessageProps {
  role: string;
  content: string;
  timestamp: number;
}

export const Message = ({ role, content, timestamp }: MessageProps) => (
  <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
    <div
      className={`message-bubble ${
        role === "user"
          ? "message-bubble-user"
          : role === "error"
            ? "message-bubble-error"
            : "message-bubble-assistant"
      }`}
    >
      <div className="font-medium mb-1">
        {role === "user" ? "You" : role === "error" ? "Error" : "Assistant"}
      </div>
      <ReactMarkdown className="whitespace-pre-wrap">{content}</ReactMarkdown>
      <div className="text-xs opacity-70 mt-2">
        {new Date(timestamp).toLocaleTimeString()}
      </div>
    </div>
  </div>
);
