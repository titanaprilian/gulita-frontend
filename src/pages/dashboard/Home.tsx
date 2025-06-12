import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useUserProfile, useCheckHistory } from "./hooks/useDashboardData";
import { AlertCircle, TrendingUp, History, UserCircle, Newspaper } from "lucide-react";
import Card from "./components/Card";
import { motion } from "framer-motion";

// Framer Motion Variants for the animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // This makes the cards appear one after another
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const DashboardHome = () => {
  const { profile, isLoading: profileLoading, error: profileError } = useUserProfile();
  const { history, isLoading: historyLoading, error: historyError } = useCheckHistory();

  const lastRiskScore = history.length > 0 ? (history[0].diabetes_result === 1 ? "High Risk" : "Low Risk") : "N/A";
  const testsTaken = history.length;

  // Combine errors from both hooks for display
  const error = profileError || historyError;

  return (
    <div className="space-y-8 px-6 py-4">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, {profileLoading ? <Skeleton className="h-8 w-40 inline-block" /> : profile?.username}!
        </h2>
        <p className="text-muted-foreground">Here’s a summary of your health journey.</p>
      </motion.div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Card
            type="stat"
            title="Last Risk Score"
            description="Most recent result"
            icon={TrendingUp}
            value={lastRiskScore}
            isLoading={historyLoading}
            buttonLink="/dashboard/result"
            buttonText="View All Results"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card
            type="stat"
            title="Tests Taken"
            description="Total checks completed"
            icon={History}
            value={testsTaken}
            isLoading={historyLoading}
            buttonLink="/dashboard/check"
            buttonText="Take New Test"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card
            type="stat"
            title="Profile"
            description="Your user profile"
            icon={UserCircle}
            value={profile?.username || ""}
            isLoading={profileLoading}
            buttonLink="/dashboard/profile"
            buttonText="Go to Profile"
          />
        </motion.div>
      </motion.div>

      {/* Blog Card - Upcoming Feature */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Card
            type="stat"
            title="Blog"
            description="Articles and health tips"
            icon={Newspaper}
            value="Coming Soon"
            isLoading={false}
            buttonLink="#"
            buttonText="Read Articles"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card type="activity" history={history} isLoading={historyLoading} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;
