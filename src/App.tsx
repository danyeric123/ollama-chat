import { OllamaChat } from "@/components/Chat";
import { QueryProvider } from "@/providers/QueryProvider";

function App() {
  return (
    <QueryProvider>
      <div className="min-h-screen flex flex-col px-5">
        <header className="shadow">
          <div className="max-w-4xl mx-auto py-4 px-4">
            <h1 className="text-2xl font-bold">Ollama Chat</h1>
          </div>
        </header>
        <main className="flex items-center justify-center width-full">
          <OllamaChat />
        </main>
      </div>
    </QueryProvider>
  );
}

export default App;
