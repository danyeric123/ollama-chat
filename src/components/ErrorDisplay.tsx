import { AlertCircle } from "lucide-react";

interface ErrorDisplayProps {
  onRetry: () => void;
}

export const ErrorDisplay = ({ onRetry }: ErrorDisplayProps) => (
  <div className="flex flex-col items-center justify-center h-screen">
    <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
    <h2 className="text-xl font-semibold mb-2">Connection Error</h2>
    <p className="text-gray-600 mb-4">Unable to connect to Ollama server</p>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Retry Connection
    </button>
  </div>
);
