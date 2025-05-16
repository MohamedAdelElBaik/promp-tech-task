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
import { useAuth } from "@/context/AuthContext";

interface Car {
  id: number;
  user_id: number;
  text_plate: string;
  number_plate: string;
  model: string | null;
  type: string | null;
  qr_code_path: string;
  created_at: string;
  updated_at: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  otp_code: string | null;
  otp_expires_at: string | null;
  email_verified_at: string | null;
  phone_verified_at: string | null;
  created_at: string;
  updated_at: string;
  car: Car;
}

interface LoginResponse {
  message: string;
  token: string;
  user: User;
  text_plate: string;
  number_plate: string;
  qr_code_path: string;
}

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

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
        login({
          token: response.data.token,
          user: response.data.user,
          text_plate: response.data.text_plate,
          number_plate: response.data.number_plate,
          qr_code_path: response.data.qr_code_path,
        });
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
