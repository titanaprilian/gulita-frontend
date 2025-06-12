import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { apiClient } from "@/lib/api";
import { Loader2, AlertCircle, ChevronLeft } from "lucide-react";

//  abstracted pieces
import { useCheckForm } from "./hooks/useCheckForm";
import { steps } from "./data/checkSteps";
import { QuestionDisplay } from "./components/QuestionDisplay";
import { ResultDisplay } from "./components/ResultDisplay";

const Check = () => {
  const [state, dispatch] = useCheckForm();
  const { step, form, result, isLoading, error } = state;

  const currentStepData = steps[step];
  const isFinalQuestion = step === steps.length - 1;
  const isResultStep = step === steps.length;
  const progressValue = (step / steps.length) * 100;

  const handleSubmit = async () => {
    dispatch({ type: "SUBMIT_START" });
    try {
      const payload = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, Number(value)]));
      const response = await apiClient.post("/users/checks", payload);

      if (!response.ok) {
        /* ... error handling ... */
      }

      const data = await response.json();
      const resultMessage = data.data?.check?.diabetes_result === 1 ? "High Risk of Diabetes" : "Low Risk of Diabetes";
      dispatch({ type: "SUBMIT_SUCCESS", payload: resultMessage });
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch({ type: "SUBMIT_FAILURE", payload: err.message });
      } else {
        dispatch({ type: "SUBMIT_FAILURE", payload: "An unknown error occurred." });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Diabetes Health Check</CardTitle>
          <CardDescription className="text-center">
            {isResultStep
              ? "Here is your personalized risk summary."
              : "Answer a few questions to get your personalized risk assessment."}
          </CardDescription>
          {!isResultStep && <Progress value={progressValue} className="w-full mt-4" />}
        </CardHeader>
        <CardContent className="min-h-[280px] flex items-center justify-center">
          {isResultStep ? (
            <ResultDisplay result={result} onReset={() => dispatch({ type: "RESET" })} />
          ) : (
            <QuestionDisplay
              currentStep={currentStepData}
              formValue={form[currentStepData.name]}
              onAnswer={(value) => dispatch({ type: "SET_ANSWER", payload: { name: currentStepData.name, value } })}
            />
          )}
        </CardContent>
        {!isResultStep && (
          <CardFooter className="flex flex-col gap-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="flex w-full justify-between">
              {isResultStep ? (
                <Button variant="primary" size="lg" className="w-full" onClick={() => dispatch({ type: "RESET" })}>
                  Start Over
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => dispatch({ type: "PREVIOUS_STEP" })}
                    disabled={step === 0 || isLoading}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button
                    size="lg"
                    variant="primary"
                    onClick={isFinalQuestion ? handleSubmit : () => dispatch({ type: "NEXT_STEP" })}
                    disabled={!form[currentStepData?.name] || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : isFinalQuestion ? (
                      "Get Result"
                    ) : (
                      "Next"
                    )}
                  </Button>
                </>
              )}
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default Check;
