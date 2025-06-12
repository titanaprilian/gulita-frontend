// src/hooks/useDashboardData.ts
import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api";

// Define the types for our data
export interface UserProfile {
  username: string;
  email: string;
}

export interface CheckHistoryItem {
  id: string;
  income: number;
  phys_hlth: number;
  high_bp: number;
  education: number;
  gen_hlth: number;
  bmi: number;
  age: number;
  diabetes_result: number;
  created_at: string;
}

// Hook for fetching user profile
export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get("/users/profile");
        if (!response.ok) throw new Error("Failed to fetch profile.");

        const data = await response.json();
        setProfile(data.data.user);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return { profile, isLoading, error };
};

// Hook for fetching check history
export const useCheckHistory = () => {
  const [history, setHistory] = useState<CheckHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get("/users/checks");
        if (!response.ok) throw new Error("Failed to fetch history.");

        const data = await response.json();
        setHistory(data.data.history || []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return { history, isLoading, error };
};
