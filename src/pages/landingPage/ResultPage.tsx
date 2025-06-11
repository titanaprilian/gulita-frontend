import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeartPulse, LogIn, TriangleAlert, UserPlus } from "lucide-react";
import BackToHomeButton from "@/components/ui/BackToHomeButton";

// A small component for the "No Result" state to keep the main component clean
const InvalidResult = () => (
  <Card className="w-full max-w-lg text-center shadow-lg">
    <BackToHomeButton />
    <CardHeader>
      <div className="mx-auto bg-amber-100 p-4 rounded-full w-fit">
        <TriangleAlert className="h-8 w-8 text-amber-600" />
      </div>
      <CardTitle className="text-2xl pt-4">No Result Available</CardTitle>
      <CardDescription className="text-lg">
        We couldn't find your prediction data. Please complete the test first.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Button variant="destructive" asChild size="lg" className="w-full">
        <Link to="/test">Take the Test</Link>
      </Button>
    </CardContent>
  </Card>
);

const ResultPage = () => {
  const location = useLocation();
  const prediction = location.state.result.data.check; // The state is now directly 0 or 1

  // Guard Clause: Check if the prediction is specifically 0 or 1.
  const hasValidResult = prediction === 0 || prediction === 1;

  if (!hasValidResult) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <InvalidResult />
      </div>
    );
  }

  const isHighRisk = prediction === 1;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <BackToHomeButton />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-lg"
      >
        <Card className="text-center shadow-lg">
          <CardHeader>
            <div className="mx-auto bg-blue-100 p-4 rounded-full w-fit mb-2">
              <HeartPulse className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl text-primary">Your Diabetes Risk Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Badge
                variant={isHighRisk ? "destructive" : "primary"}
                className="text-lg font-semibold px-6 py-2 rounded-full"
              >
                {isHighRisk ? "High Risk: Diabetic" : "Low Risk: Non-Diabetic"}
              </Badge>
            </div>

            <p className="text-lg text-slate-600 mb-8">
              To view detailed results and personalized recommendations, please create an account or log in.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="flex-1" variant="primary">
                <Link to="/signup">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Account
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="flex-1">
                <Link to="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Log In
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ResultPage;
