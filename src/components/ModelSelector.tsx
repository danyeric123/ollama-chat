import { OllamaModel } from "@/types";

interface ModelSelectorProps {
  selectedModel: string;
  models?: OllamaModel[];
  isLoading: boolean;
  onModelChange: (model: string) => void;
}

export const ModelSelector = ({
  selectedModel,
  models,
  isLoading,
  onModelChange,
}: ModelSelectorProps) => (
  <div className="p-4 border-b sticky z-10 top-0">
    <select
      value={selectedModel}
      onChange={(e) => onModelChange(e.target.value)}
      className="model-selector"
      disabled={isLoading}
    >
      {isLoading ? (
        <option>Loading models...</option>
      ) : (
        models?.map((model) => (
          <option key={model.name} value={model.name}>
            {model.name}
          </option>
        ))
      )}
    </select>
  </div>
);
