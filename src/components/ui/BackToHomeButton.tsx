import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";

const BackToHomeButton = ({ className = "fixed top-6 left-6" }: { className?: string }) => (
  <Link to="/" className={buttonVariants({ variant: "primary", className })}>
    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
    Back to Home
  </Link>
);

export default BackToHomeButton;
