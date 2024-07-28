import { Input } from "@/components/ui/input";

interface ParameterInputProps {
  parameters: Record<string, string>;
  onChange: (params: Record<string, string>) => void;
}

export default function ParameterInput({
  parameters,
  onChange,
}: ParameterInputProps) {
  const handleChange = (key: string, value: string) => {
    onChange({ ...parameters, [key]: value });
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Parameters:</h3>
      {Object.entries(parameters).map(([key, value]) => (
        <div key={key}>
          <label htmlFor={key} className="block text-sm font-medium">
            {key}
          </label>
          <Input
            id={key}
            value={value}
            onChange={(e) => handleChange(key, e.target.value)}
            className="mt-1"
          />
        </div>
      ))}
    </div>
  );
}
