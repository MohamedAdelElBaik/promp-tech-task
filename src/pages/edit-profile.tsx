import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout";
import { FormContainer } from "@/components/form-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function EditProfilePage() {
  const { auth } = useAuth();
  const [name, setName] = useState(auth.user?.name || "");
  const [email, setEmail] = useState(auth.user?.email || "");
  const [phone, setPhone] = useState(auth.user?.phone || "");
  const [textPlate, setTextPlate] = useState(auth.text_plate || "");
  const [numberPlate, setNumberPlate] = useState(auth.number_plate || "");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !phone || !textPlate || !numberPlate) {
      setError("Please fill in all fields");
      return;
    }

    // Show message indicating no API is available
    setSuccess(true);
    setError(null);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <FormContainer
          title="Edit Profile"
          description="Update your personal information and car details"
          className="max-w-lg"
        >
          {success && (
            <Alert className="mb-6 bg-green-50 text-green-900 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                There is no API to update the profile yet.
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive" className="mb-6 border-destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="border-border focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="border-border focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-foreground"
              >
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="border-border focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="text-plate"
                className="text-sm font-medium text-foreground"
              >
                License Plate (Text)
              </Label>
              <Input
                id="text-plate"
                type="text"
                value={textPlate}
                onChange={(e) => setTextPlate(e.target.value)}
                placeholder="Enter license plate text (e.g., ق و)"
                className="border-border focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="number-plate"
                className="text-sm font-medium text-foreground"
              >
                License Plate (Number)
              </Label>
              <Input
                id="number-plate"
                type="text"
                value={numberPlate}
                onChange={(e) => setNumberPlate(e.target.value)}
                placeholder="Enter license plate number (e.g., 123)"
                className="border-border focus:ring-primary"
              />
            </div>

            <div className="flex gap-4 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-border hover:bg-muted transition-colors"
                onClick={() => navigate("/profile")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </FormContainer>
      </div>
    </Layout>
  );
}
