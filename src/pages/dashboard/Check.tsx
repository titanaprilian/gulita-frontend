import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const steps = [
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
  {
    name: "bmi",
    label: "What is your BMI?",
    type: "number",
    placeholder: "Enter your BMI",
    min: 0,
    step: 0.1,
  },
  {
    name: "phys_hlth",
    label: "How many days in the past 30 days you feel physically ill or injured?",
    type: "select",
    options: [
      { label: "Not at all", value: "0" },
      { label: "1-2 days", value: "7" },
      { label: "7-14 days", value: "15" },
      { label: "More than 14 days", value: "30" },
    ],
    placeholder: "Select an option",
  },
  {
    name: "gen_hlth",
    label: "From scale 1-5, how would you rate your general health?",
    type: "select",
    options: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
      { label: "5", value: "5" },
    ],
    placeholder: "Select your income range",
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
    placeholder: "Select your education level",
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
    placeholder: "Select your income range",
  },
  {
    name: "high_bp",
    label: "Do you have high blood pressure?",
    type: "select",
    options: [
      { label: "Yes", value: "1" },
      { label: "No", value: "0" },
    ],
    placeholder: "Select yes or no",
  },
];

// Type guard to check if options are age group objects
function isAgeGroupOptions(options: unknown): options is { label: string; value: string }[] {
  return (
    Array.isArray(options) &&
    options.length > 0 &&
    typeof options[0] === "object" &&
    options[0] !== null &&
    "label" in options[0]
  );
}

const Check = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Record<string, string>>({
    bmi: "",
    age: "",
    gen_hlth: "",
    income: "",
    high_bp: "",
    phys_hlth: "",
    education: "",
  });
  const [result, setResult] = useState<string | null>(null);

  const current = steps[step];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [current.name]: e.target.value });
  };

  // For button group selection (age and select types)
  const handleButtonSelect = (value: string) => {
    setForm({ ...form, [current.name]: value });
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (result !== null) {
      // If result is shown, reset to first step
      setStep(0);
      setResult(null);
      setForm({
        bmi: "",
        age: "",
        income: "",
        education: "",
        gen_hlth: "",
        phys_hlth: "",
        high_bp: "",
      });
      return;
    }
    if ((current.type === "age-group" || current.type === "select") && !form[current.name]) return;
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Submit to backend and show result on next slide
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Not authenticated");
        // Convert form values to numbers
        const payload = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, Number(value)]));

        const response = await fetch("http://localhost:3000/api/v1/users/checks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData);
          throw new Error(errorData.message || "Failed to create health check");
        }
        const data = await response.json();
        const diabetesResult = data.data?.check?.diabetes_result;
        setResult(
          diabetesResult === 1
            ? "High risk of diabetes"
            : diabetesResult === 0
            ? "Low risk of diabetes"
            : "Unknown result"
        );
      } catch (err) {
        setResult(err instanceof Error ? err.message : "Failed to submit check");
      }
      setStep(step + 1);
    }
  };

  return (
    <div className="py-10 px-4 mx-auto w-3/4">
      <h2 className="text-3xl text-center font-bold text-blue-700 mb-4">Diabetes Test</h2>
      <form
        onSubmit={handleNext}
        className="bg-white rounded-xl shadow p-6 flex flex-col gap-6 w-3/4 mx-auto justify-center items-center h-min"
        style={{ minWidth: 320, minHeight: 320 }}
      >
        {step < steps.length ? (
          <>
            <label className="text-lg font-medium text-gray-700 mb-2">{current.label}</label>
            {/* Button group for age-group and select types */}
            {current.type === "age-group" || (current.type === "select" && isAgeGroupOptions(current.options)) ? (
              <div className="flex flex-col gap-3 w-full">
                <div
                  className={`grid ${
                    Array.isArray(current.options) && current.options.length > 3 ? "grid-cols-2" : "grid-cols-1"
                  } gap-3`}
                >
                  {Array.isArray(current.options) &&
                    current.options.map((opt) =>
                      typeof opt === "object" && "label" in opt && "value" in opt ? (
                        <Button
                          key={opt.value}
                          type="button"
                          variant={form[current.name] === opt.value ? "default" : "outline"}
                          className={
                            form[current.name] === opt.value ? "border-blue-600 bg-blue-100 text-blue-700" : ""
                          }
                          onClick={() => handleButtonSelect(opt.value)}
                        >
                          {opt.label}
                        </Button>
                      ) : null
                    )}
                </div>
                {!form[current.name] && <span className="text-xs text-red-500">Please select an option.</span>}
              </div>
            ) : (
              <Input
                type={current.type}
                name={current.name}
                value={form[current.name]}
                onChange={handleChange}
                placeholder={current.placeholder}
                min={current.min}
                step={current.step}
                required
              />
            )}
            <div className="flex justify-between mt-4">
              <Button
                type="button"
                variant="outline"
                className="mr-2"
                disabled={step === 0}
                onClick={() => setStep((s) => Math.max(0, s - 1))}
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={(current.type === "age-group" || current.type === "select") && !form[current.name]}
              >
                {step === steps.length - 1 ? "Submit" : "Next"}
              </Button>
            </div>
            <div className="text-sm text-gray-500 text-center mt-2">
              Step {step + 1} of {steps.length}
            </div>
          </>
        ) : (
          // Result slide
          <div className="w-full flex flex-col items-center justify-center">
            <div className="bg-blue-50 border border-blue-200 rounded-xl shadow p-6 w-full max-w-md text-center">
              <h3 className="text-2xl font-bold text-blue-700 mb-2">Result</h3>
              <p className="text-lg text-gray-700">{result}</p>
            </div>
            <Button className="mt-6" type="submit">
              Start Over
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Check;
