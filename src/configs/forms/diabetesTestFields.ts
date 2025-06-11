import type { FieldConfig } from "@/types/forms";

export const diabetesTestFields: FieldConfig[] = [
  {
    name: "age",
    label: "Age Group",
    type: "select",
    placeholder: "Select your age group", // Add placeholder
    options: [
      { value: "3", label: "Below 40" },
      { value: "5", label: "41-49" },
      { value: "7", label: "50-59" },
      { value: "9", label: "60 or older" },
    ],
  },
  { name: "bmi", label: "Body Mass Index (BMI)", type: "number", props: { step: "0.1" } },
  {
    name: "phys_hlth",
    label: "Days of poor physical health in the past month?",
    placeholder: "Select number of days",
    type: "select",
    options: [
      { value: "0", label: "Not at all" },
      { value: "7", label: "1-2 days" },
      { value: "15", label: "7-14 days" },
      { value: "30", label: "More than 14 days" },
    ],
  },
  {
    name: "high_bp",
    label: "Do you have high blood pressure?",
    type: "select",
    placeholder: "Select yes or no",
    options: [
      { label: "Yes", value: "1" },
      { label: "No", value: "0" },
    ],
  },
  {
    name: "education",
    label: "Highest level of education?",
    placeholder: "Select your education level",
    type: "select",
    options: [
      { value: "3", label: "Elementary School" },
      { value: "4", label: "Junior High School" },
      { value: "5", label: "Senior High School" },
      { value: "6", label: "College" },
    ],
  },
  {
    name: "income",
    label: "What is your annual income?",
    placeholder: "Select your income range",
    type: "select",
    options: [
      { value: "1", label: "Below 5 million IDR" },
      { value: "3", label: "10-20 million IDR" },
      { value: "5", label: "20-50 million IDR" },
      { value: "7", label: "50-100 million IDR" },
      { value: "8", label: "Above 100 million IDR" },
    ],
  },
  {
    name: "gen_hlth",
    label: "From scale 1-5, how would you rate your general health?",
    placeholder: "Select your health rating",
    type: "select",
    options: [
      { value: "1", label: "1 (Poor)" },
      { value: "2", label: "2" },
      { value: "3", label: "3 (Average)" },
      { value: "4", label: "4" },
      { value: "5", label: "5 (Excellent)" },
    ],
  },
];
