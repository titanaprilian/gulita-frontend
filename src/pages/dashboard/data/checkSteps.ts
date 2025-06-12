// A type for our step options for better type safety
interface StepOption {
  label: string;
  value: string;
}

export interface StepConfig {
  name: keyof FormState; // Ensures name matches our form state keys
  label: string;
  type: "age-group" | "select" | "number";
  options?: StepOption[];
  placeholder?: string;
}

// Define the type for the form state
export type FormState = {
  bmi: string;
  age: string;
  gen_hlth: string;
  income: string;
  high_bp: string;
  phys_hlth: string;
  education: string;
};

// Export the configuration
export const steps: StepConfig[] = [
  {
    name: "age",
    label: "What is your age group?",
    type: "age-group",
    options: [
      { label: "Below 40", value: "3" },
      { label: "41-49", value: "5" },
      { label: "50-59", value: "7" },
      { label: "60 or older", value: "9" },
    ],
  },
  { name: "bmi", label: "What is your BMI?", type: "number", placeholder: "Enter your BMI" },
  {
    name: "phys_hlth",
    label: "Days of poor physical health in the past month?",
    type: "select",
    options: [
      { label: "Not at all", value: "0" },
      { label: "1-2 days", value: "7" },
      { label: "7-14 days", value: "15" },
      { label: "More than 14 days", value: "30" },
    ],
  },
  {
    name: "gen_hlth",
    label: "On a scale of 1-5, how is your general health?",
    type: "select",
    options: [
      { label: "1 (Poor)", value: "1" },
      { label: "2", value: "2" },
      { label: "3 (Good)", value: "3" },
      { label: "4", value: "4" },
      { label: "5 (Excellent)", value: "5" },
    ],
  },
  {
    name: "education",
    label: "What is your highest level of education?",
    type: "select",
    options: [
      { label: "Elementary School", value: "3" },
      { label: "Junior High School", value: "4" },
      { label: "Senior High School", value: "5" },
      { label: "College", value: "6" },
    ],
  },
  {
    name: "income",
    label: "What is your annual income?",
    type: "select",
    options: [
      { label: "Below 5 million IDR", value: "1" },
      { label: "10-20 million IDR", value: "3" },
      { label: "20-50 million IDR", value: "5" },
      { label: "50-100 million IDR", value: "7" },
      { label: "Above 100 million IDR", value: "8" },
    ],
  },
  {
    name: "high_bp",
    label: "Do you have high blood pressure?",
    type: "select",
    options: [
      { label: "Yes", value: "1" },
      { label: "No", value: "0" },
    ],
  },
];
