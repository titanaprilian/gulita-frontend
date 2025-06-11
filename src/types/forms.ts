// src/types/forms.ts
export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: "select" | "number" | "text" | "email" | "password";
  placeholder?: string;
  options?: FieldOption[];
  props?: React.InputHTMLAttributes<HTMLInputElement>;
}
