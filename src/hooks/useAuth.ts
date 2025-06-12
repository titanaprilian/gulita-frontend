import { apiClient } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const registerSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const useAuth = () => {
  const navigate = useNavigate();

  // LOGIN FUNCTION
  const login = async (values: z.infer<typeof loginSchema>) => {
    const response = await apiClient.publicPost("/users/login", values);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Login failed. Please check your credentials.");
    }

    localStorage.setItem("accessToken", responseData.data.token.accessToken);
    sessionStorage.setItem("refreshToken", responseData.data.token.refreshToken);
    navigate("/dashboard");
  };

  // REGISTER FUNCTION
  const register = async (values: z.infer<typeof registerSchema>) => {
    const response = await apiClient.publicPost("/users/register", values);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Registration failed. Please try again.");
    }

    // On success, navigate to login with a success message flag
    navigate("/login", { state: { signupSuccess: true } });
  };

  // LOGOUT FUNCTION
  const logout = async () => {
    const refreshToken = sessionStorage.getItem("refreshToken");

    const cleanup = () => {
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      navigate("/login");
    };

    if (!refreshToken) {
      cleanup();
      return;
    }

    try {
      await apiClient.post("/users/logout", { refreshToken });
    } catch (error) {
      console.error("Logout API call failed, but logging out locally.", error);
    } finally {
      cleanup();
    }
  };

  return { login, register, logout };
};
