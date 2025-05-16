import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/utils/axios";

export default function ProfilePage() {
  const { auth } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Redirect to login if not authenticated
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    setPasswordSuccess(false);
    setPasswordError(null);

    if (!newPassword || !confirmPassword) {
      setPasswordError("Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      await axiosInstance.post(
        "/api/change-password", // Adjust endpoint as per your API
        {
          new_password: newPassword,
          confirm_password: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
      );

      setPasswordSuccess(true);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          setPasswordError("Unauthorized. Please log in again.");
        } else if (status === 400) {
          setPasswordError(
            error.response.data.message || "Invalid password input.",
          );
        } else {
          setPasswordError("An error occurred. Please try again.");
        }
      } else {
        setPasswordError("Network error. Please check your connection.");
      }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">My Profile</h1>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile Details</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>

            {/* Profile Details Tab */}
            <TabsContent value="profile" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    View and manage your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* User Information */}
                  <div className="space-y-1">
                    <Label>Name</Label>
                    <div className="rounded-md bg-muted p-3">
                      {auth.user?.name || "N/A"}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label>Email</Label>
                    <div className="rounded-md bg-muted p-3">
                      {auth.user?.email || "N/A"}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label>Phone</Label>
                    <div className="rounded-md bg-muted p-3">
                      {auth.user?.phone || "N/A"}
                    </div>
                  </div>

                  {/* Car Information */}
                  <div className="pt-4 border-t border-border">
                    <h3 className="text-lg font-semibold mb-4">Car Details</h3>

                    <div className="space-y-1">
                      <Label>License Plate</Label>
                      <div className="rounded-md bg-muted p-3">
                        {auth.text_plate} {auth.number_plate}
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label>QR Code</Label>
                      <div className="mt-2 bg-white p-4 inline-block rounded-md border">
                        {auth.qr_code_path ? (
                          <img
                            src={auth.qr_code_path}
                            alt="QR Code"
                            className="w-32 h-32 object-contain"
                          />
                        ) : (
                          <div className="w-32 h-32 bg-[#f0f0f0] flex items-center justify-center">
                            <span className="text-black text-xs">
                              No QR Code Available
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/edit-profile" className="w-full">
                    <Button className="w-full">Edit Profile</Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Password Tab */}
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {passwordSuccess && (
                    <Alert className="bg-green-50 text-green-900 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30">
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertTitle>Success!</AlertTitle>
                      <AlertDescription>
                        Your password has been updated successfully.
                      </AlertDescription>
                    </Alert>
                  )}

                  {passwordError && (
                    <Alert variant="destructive">
                      <AlertDescription>{passwordError}</AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Update Password
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
