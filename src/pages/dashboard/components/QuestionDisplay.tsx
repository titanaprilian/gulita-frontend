// src/pages/dashboard/components/QuestionDisplay.tsx
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { OptionButtonGroup } from "./OptionButtonGroup";
import type { StepConfig } from "../data/checkSteps";

interface Props {
  currentStep: StepConfig;
  formValue: string;
  onAnswer: (value: string) => void;
}

export const QuestionDisplay = ({ currentStep, formValue, onAnswer }: Props) => {
  const renderInput = () => {
    switch (currentStep.type) {
      case "age-group":
      case "select":
        return <OptionButtonGroup options={currentStep.options || []} selectedValue={formValue} onSelect={onAnswer} />;
      case "number":
        return (
          <Input
            type="number"
            value={formValue || ""}
            onChange={(e) => onAnswer(e.target.value)}
            placeholder={currentStep.placeholder}
            className="max-w-xs text-center text-lg h-12"
            required
          />
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep.name}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-8 text-center"
      >
        <label className="text-xl font-medium text-slate-700">{currentStep.label}</label>
        {renderInput()}
      </motion.div>
    </AnimatePresence>
  );
};
