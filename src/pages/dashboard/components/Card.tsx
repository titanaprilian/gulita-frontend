import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card as UICard, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { History } from "lucide-react";
import React from "react";

// For stat cards
interface StatCardProps {
  type: "stat";
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  value: React.ReactNode;
  isLoading: boolean;
  buttonLink: string;
  buttonText: string;
}

// For recent activity
interface ActivityItem {
  id: string;
  created_at: string;
  diabetes_result: number;
}
interface RecentActivityCardProps {
  type: "activity";
  history: ActivityItem[];
  isLoading: boolean;
}

type CardProps = StatCardProps | RecentActivityCardProps;

const Card: React.FC<CardProps> = (props) => {
  if (props.type === "stat") {
    const { title, description, icon: Icon, value, isLoading, buttonLink, buttonText } = props;
    return (
      <UICard className="flex flex-col">
        <CardHeader className="flex-row items-center gap-4 space-y-0 pb-2">
          <Icon className="h-8 w-8 text-muted-foreground" />
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          {isLoading ? <Skeleton className="h-8 w-3/4" /> : <p className="text-3xl font-bold text-primary">{value}</p>}
        </CardContent>
        <CardFooter>
          <Button asChild variant="primary" className="w-full">
            <Link to={buttonLink}>{buttonText}</Link>
          </Button>
        </CardFooter>
      </UICard>
    );
  }
  // Recent activity
  const { history, isLoading } = props;
  return (
    <UICard className="md:col-span-2 lg:col-span-1 flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5 text-muted-foreground" />
          Recent Activity
        </CardTitle>
        <CardDescription>Your last 4 health checks.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : history.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recent activity. Take a test to see your results here.</p>
        ) : (
          <ul className="space-y-3">
            {history.slice(0, 4).map((item) => (
              <li key={item.id} className="flex items-center justify-between text-sm">
                <span>{new Date(item.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                <Badge variant={item.diabetes_result === 1 ? "destructive" : "outline"}>
                  {item.diabetes_result === 1 ? "High Risk" : "Low Risk"}
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </UICard>
  );
};

export default Card;
