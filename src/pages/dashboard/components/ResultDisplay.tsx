// src/pages/dashboard/components/ResultDisplay.tsx
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, HeartCrack, Repeat } from "lucide-react";
import { Link } from "react-router-dom";

interface ResultDisplayProps {
  result: string | null;
  onReset: () => void;
}

export const ResultDisplay = ({ result, onReset }: ResultDisplayProps) => {
  const isHighRisk = result === "High Risk of Diabetes";

  const content = isHighRisk
    ? {
        icon: HeartCrack,
        iconClass: "text-destructive",
        badgeVariant: "destructive" as const,
        title: "High Risk Detected",
        tip: "Our analysis suggests a high risk. We strongly recommend consulting a healthcare professional for a formal diagnosis and guidance.",
        ctaText: "Find a Doctor Nearby",
        ctaLink: "/dashboard",
      }
    : {
        icon: ShieldCheck,
        iconClass: "text-green-500",
        badgeVariant: "primary" as const,
        title: "Low Risk Detected",
        tip: "Great news! Your risk appears to be low. Continue to maintain a healthy lifestyle with regular exercise and a balanced diet.",
        ctaText: "Explore Health Articles",
        ctaLink: "/dashboard",
      };

  const Icon = content.icon;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "circOut" }}
      className="text-center flex flex-col items-center gap-4 w-full"
    >
      <Icon className={`h-16 w-16 ${content.iconClass}`} />
      <h3 className="text-2xl font-bold">{content.title}</h3>
      <Badge variant={content.badgeVariant} className="text-lg px-4 py-1">
        {result}
      </Badge>
      <p className="text-muted-foreground max-w-md mx-auto">{content.tip}</p>

      <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full max-w-xs justify-center">
        <Button variant="primary" asChild size="lg" className="flex-1">
          <Link to={content.ctaLink}>{content.ctaText}</Link>
        </Button>
        <Button size="lg" variant="primary" onClick={onReset} className="flex-1">
          <Repeat className="mr-2 h-4 w-4" />
          Start Over
        </Button>
      </div>
    </motion.div>
  );
};
