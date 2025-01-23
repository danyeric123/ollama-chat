import { AlertCircle } from "lucide-react";

interface ErrorDisplayProps {
  onRetry: () => void;
}

export const ErrorDisplay = ({ onRetry }: ErrorDisplayProps) => (
  <div className="flex flex-col items-center justify-center h-screen max-w-lg mx-auto text-center px-4">
    <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
    <h2 className="text-xl font-semibold mb-2">Local Ollama Not Found</h2>
    <p className="text-gray-600 mb-4">
      This application requires Ollama to be running locally on your machine. 
      Please make sure:
    </p>
    <ul className="text-left text-gray-600 mb-4">
      <li className="mb-2">1. Ollama is installed on your computer</li>
      <li className="mb-2">2. The Ollama service is running</li>
      <li className="mb-2">3. It's accessible at http://localhost:11434</li>
    </ul>
    <p className="text-gray-600 mb-4">
      Visit <a href="https://ollama.ai" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
        ollama.ai
      </a> for installation instructions.
    </p>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Retry Connection
    </button>
  </div>
);