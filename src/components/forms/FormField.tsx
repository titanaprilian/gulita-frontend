// src/components/forms/FormField.tsx
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { FieldConfig } from "@/types/forms";

interface FormFieldProps {
  field: FieldConfig;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

const FormField = ({ field, value, onChange, onSelectChange }: FormFieldProps) => {
  const { name, label, type, options, props, placeholder } = field;

  const renderField = () => {
    switch (type) {
      case "select":
        return (
          <Select name={name} value={value} onValueChange={(val) => onSelectChange(name, val)} required>
            <SelectTrigger id={name}>
              <SelectValue placeholder={placeholder || "Select an option"} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "number":
      case "text":
      case "email":
      case "password":
        return <Input id={name} name={name} type={type} value={value} onChange={onChange} required {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-left" htmlFor={name}>
        {label}
      </Label>
      {renderField()}
    </div>
  );
};

export default FormField;
