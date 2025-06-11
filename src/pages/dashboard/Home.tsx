import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  const [profile, setProfile] = useState<{ username: string; email: string } | null>(null);
  const [history, setHistory] = useState<
    Array<{ id: string; bmi: number; age: number; diabetes_result: number; created_at: string }>
  >([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = sessionStorage.getItem("refreshToken");
    if (!accessToken) return;

    // Helper to refresh access token
    const refreshAccessToken = async () => {
      if (!refreshToken) return null;
      try {
        const response = await fetch("http://localhost:3000/api/v1/users/token/refresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });
        if (!response.ok) return null;
        const data = await response.json();
        if (data.status === "success" && data.data && data.data.token && data.data.token.accessToken) {
          localStorage.setItem("accessToken", data.data.token.accessToken);
          return data.data.token.accessToken;
        }
      } catch {
        // ignore error
      }
      return null;
    };

    // Wrapper for fetch with token refresh
    const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
      let token = localStorage.getItem("accessToken");
      let res = await fetch(url, {
        ...options,
        headers: { ...(options.headers || {}), Authorization: `Bearer ${token}` },
      });
      if (res.status === 401 && refreshToken) {
        // Try to refresh token
        token = await refreshAccessToken();
        if (token) {
          res = await fetch(url, {
            ...options,
            headers: { ...(options.headers || {}), Authorization: `Bearer ${token}` },
          });
        }
      }
      return res;
    };

    // Fetch profile
    const fetchProfile = async () => {
      try {
        const response = await fetchWithAuth("http://localhost:3000/api/v1/users/profile");
        if (!response.ok) return;
        const data = await response.json();
        if (data.status === "success" && data.data && data.data.user) {
          setProfile({
            username: data.data.user.username,
            email: data.data.user.email,
          });
        }
      } catch {
        // ignore error
      }
    };
    // Fetch health check history
    const fetchHistory = async () => {
      try {
        const response = await fetchWithAuth("http://localhost:3000/api/v1/users/checks");
        if (!response.ok) return;
        const data = await response.json();
        if (data.status === "success" && data.data && Array.isArray(data.data.history)) {
          setHistory(data.data.history);
        }
      } catch {
        // ignore error
      }
    };
    fetchProfile();
    fetchHistory();
  }, []);

  // Derive last risk score and tests taken from history
  const lastRiskScore = history.length > 0 ? (history[0].diabetes_result === 1 ? "Diabetic" : "Non-diabetic") : "-";
  const testsTaken = history.length;

  return (
    <div className="py-10 px-4">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">
        Welcome to Gulita Dashboard, {profile ? profile.username : "-"}!
      </h2>
      <p className="text-lg text-gray-700 mb-8">
        Here you can view your diabetes test results, track your health, and manage your profile settings.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="justify-between">
          <CardHeader>
            <CardTitle>Last Risk Score</CardTitle>
            <CardDescription>Your most recent diabetes risk result</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-blue-600">{lastRiskScore}</span>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/dashboard/result">View Results</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="justify-between">
          <CardHeader>
            <CardTitle>Tests Taken</CardTitle>
            <CardDescription>Total diabetes tests completed</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-blue-600">{testsTaken}</span>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/dashboard/check">Take New Test</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="justify-between">
          <CardHeader>
            <CardTitle>Profile Overview</CardTitle>
            <CardDescription>Quick access to your profile</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-blue-600">{profile ? profile.username : "-"} </span>
            <span className="text-sm text-blue-600">({profile ? profile.email : "-"})</span>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/dashboard/profile">Go to Profile</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="justify-between">
          <CardHeader>
            <CardTitle>Blog</CardTitle>
            <CardDescription>Read the latest articles and tips on diabetes</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-blue-600">📰</span>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/dashboard/blog">Go to Blog</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>See your latest diabetes checks</CardDescription>
          </CardHeader>
          <CardContent>
            {history.length === 0 ? (
              <p className="text-gray-600">No recent activity. Take a test to see your results here.</p>
            ) : (
              <ul className="text-gray-700 text-sm space-y-2">
                {history.slice(0, 5).map((item) => (
                  <li key={item.id} className="flex flex-col border-b last:border-b-0 pb-2">
                    <span className="font-semibold">{new Date(item.created_at).toLocaleDateString()}:</span>
                    <span>
                      BMI: {item.bmi}, Age: {item.age}, Result:{" "}
                      {item.diabetes_result === 1 ? "Diabetic" : "Non-diabetic"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
