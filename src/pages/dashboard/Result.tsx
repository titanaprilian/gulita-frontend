import { Link } from "react-router-dom";
import { useCheckHistory, type CheckHistoryItem } from "./hooks/useDashboardData";
import { formatCheckDetails } from "./utils/formatters"; // Import our new utility

// shadcn/ui components
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, FileText, PlusCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

// A dedicated component for the empty state
const NoResultsState = () => (
  <div className="text-center p-10 bg-slate-50 rounded-lg border-2 border-dashed">
    <FileText className="mx-auto h-12 w-12 text-slate-400" />
    <h3 className="mt-4 text-lg font-semibold">No Results Found</h3>
    <p className="mt-1 text-sm text-muted-foreground">
      You haven't taken any tests yet. Take one to see your results here.
    </p>
    <Button asChild className="mt-6">
      <Link to="/dashboard/check">
        <PlusCircle className="mr-2 h-4 w-4" /> Take New Test
      </Link>
    </Button>
  </div>
);

// A dedicated component for the loading state
const LoadingState = () => (
  <div className="space-y-4 ">
    <div className="bg-white px-4 py-6 rounded-lg shadow-sm">
      <Skeleton className="h-20 w-full" />
    </div>
    <div className="bg-white px-4 py-6 rounded-lg shadow-sm">
      <Skeleton className="h-20 w-full" />
    </div>
    <div className="bg-white px-4 py-6 rounded-lg shadow-sm">
      <Skeleton className="h-20 w-full" />
    </div>
    <div className="bg-white px-4 py-6 rounded-lg shadow-sm">
      <Skeleton className="h-20 w-full" />
    </div>
    <div className="bg-white px-4 py-6 rounded-lg shadow-sm">
      <Skeleton className="h-20 w-full" />
    </div>
  </div>
);

// The main component
const Result = () => {
  const { history, isLoading, error } = useCheckHistory();

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6 px-6 py-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Your Health History</h2>
        <p className="text-muted-foreground">Review the results from all your past health checks.</p>
      </div>

      {isLoading ? (
        <LoadingState />
      ) : history.length === 0 ? (
        <NoResultsState />
      ) : (
        <Accordion type="single" collapsible className="w-full space-y-4">
          {history.map((result: CheckHistoryItem, index: number) => {
            const details = formatCheckDetails(result);
            const isHighRisk = result.diabetes_result === 1;

            return (
              <AccordionItem value={`item-${index}`} key={result.id} className="border-b-0">
                <Card className="shadow-sm">
                  <AccordionTrigger className="w-full px-6 py-4 text-left hover:no-underline">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col items-start">
                        <span className="font-semibold text-lg">
                          Test from{" "}
                          {new Date(result.created_at).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        <span className="text-sm text-muted-foreground">Click to see details</span>
                      </div>
                      <Badge variant={isHighRisk ? "destructive" : "default"} className="text-sm">
                        {isHighRisk ? "High Risk" : "Low Risk"}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4 pt-4 border-t">
                      <p>
                        <span className="font-semibold text-muted-foreground">BMI:</span> {result.bmi}
                      </p>
                      <p>
                        <span className="font-semibold text-muted-foreground">Age Group:</span> {details.age}
                      </p>
                      <p>
                        <span className="font-semibold text-muted-foreground">High BP:</span> {details.high_bp}
                      </p>
                      <p>
                        <span className="font-semibold text-muted-foreground">General Health:</span> {details.gen_hlth}
                      </p>
                      <p>
                        <span className="font-semibold text-muted-foreground">Physical Health:</span>{" "}
                        {details.phys_hlth}
                      </p>
                      <p>
                        <span className="font-semibold text-muted-foreground">Education:</span> {details.education}
                      </p>
                      <p>
                        <span className="font-semibold text-muted-foreground">Income:</span> {details.income}
                      </p>
                    </div>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </div>
  );
};

export default Result;
