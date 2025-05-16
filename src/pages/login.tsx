import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout";
import { FormContainer } from "@/components/form-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import axiosInstance from "@/utils/axios";

interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
}

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Basic validation
    if (!identifier || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post<LoginResponse>(
        "/public/api/login",
        {
          identifier,
          password,
        },
      );

      if (response.status === 200) {
        if (response.data.token) {
          localStorage.setItem("authToken", response.data.token);
        } else {
          console.warn("No token received from API");
        }
        navigate("/");
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          setError("Invalid credentials. Please try again.");
        } else if (status === 400) {
          setError("Invalid request. Please check your input.");
        } else {
          setError(
            error.response.data.message || "An error occurred during login.",
          );
        }
      } else if (error.request) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <FormContainer
          title="Login"
          description="Enter your credentials to access your account"
        >
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="identifier">Email or Username</Label>
              <Input
                id="identifier"
                type="text"
                placeholder="Enter your email or username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button
                  variant="link"
                  className="p-0 h-auto text-xs"
                  type="button"
                  disabled={isLoading}
                >
                  Forgot password?
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Button
                variant="link"
                className="p-0 h-auto"
                type="button"
                disabled={isLoading}
              >
                Sign up
              </Button>
            </div>
          </form>
        </FormContainer>
      </div>
    </Layout>
  );
}
