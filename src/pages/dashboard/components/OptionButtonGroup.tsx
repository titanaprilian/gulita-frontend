import { Button } from "@/components/ui/button";

interface Option {
  label: string;
  value: string;
}
interface Props {
  options: Option[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export const OptionButtonGroup = ({ options, selectedValue, onSelect }: Props) => (
  <div className={`grid w-full max-w-sm gap-3 ${options.length > 2 ? "grid-cols-2" : "grid-cols-1"}`}>
    {options.map((opt) => (
      <Button
        key={opt.value}
        type="button"
        variant={selectedValue === opt.value ? "primary" : "outline"}
        onClick={() => onSelect(opt.value)}
        size="lg"
      >
        {opt.label}
      </Button>
    ))}
  </div>
);
