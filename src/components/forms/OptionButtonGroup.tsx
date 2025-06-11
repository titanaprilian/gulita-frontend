import { Button } from "@/components/ui/button";

interface Option {
  label: string;
  value: string;
}

interface OptionButtonGroupProps {
  options: Option[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export const OptionButtonGroup = ({ options, selectedValue, onSelect }: OptionButtonGroupProps) => {
  return (
    <div className={`grid w-full max-w-sm gap-3 ${options.length > 3 ? "grid-cols-2" : "grid-cols-1"}`}>
      {options.map((opt) => (
        <Button
          key={opt.value}
          type="button"
          variant={selectedValue === opt.value ? "default" : "outline"}
          onClick={() => onSelect(opt.value)}
          size="lg"
        >
          {opt.label}
        </Button>
      ))}
    </div>
  );
};
