import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";

// Import shadcn/ui components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// reusable component and shared type
import FormField from "@/components/forms/FormField";
import { diabetesTestFields } from "@/configs/forms/diabetesTestFields"; // Import the config
import BackToHomeButton from "@/components/ui/BackToHomeButton";

// Initial state for the form
const initialFormState = {
  bmi: "",
  age: "",
  gen_hlth: "",
  income: "",
  high_bp: "",
  phys_hlth: "",
  education: "",
};

const DiabetesTest = () => {
  const [form, setForm] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Generic handler for Input components
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Generic handler for Select components
  const handleSelectChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const floatForm = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, parseFloat(value)]));

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${apiBaseUrl}/checks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(floatForm),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "An unknown error occurred.");
      }

      const data = await response.json();
      console.log("API Response:", data);
      navigate("/result", { state: { result: data } });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 py-12 px-4 mt-5">
      <BackToHomeButton />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-full max-w-lg"
      >
        <Card className="max-content max-w-lg shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-2 text-blue-600">Diabetes Risk Assesment</CardTitle>
            <CardContent className="w-max-content mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6">
                  {diabetesTestFields.map((field) => (
                    <FormField
                      key={field.name}
                      field={field}
                      value={form[field.name as keyof typeof form]}
                      onChange={handleChange}
                      onSelectChange={handleSelectChange}
                    />
                  ))}
                </div>

                {error && (
                  <Alert variant="destructive" className="mt-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Submission Failed</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full mt-8" variant="primary" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    "Check My Risk"
                  )}
                </Button>
              </form>
            </CardContent>
          </CardHeader>
        </Card>
      </motion.div>
    </div>
  );
};

export default DiabetesTest;
