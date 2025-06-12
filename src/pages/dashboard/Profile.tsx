// src/pages/dashboard/Profile.tsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner"; // Import the toaster
import { Loader2, AlertCircle, Edit, Save } from "lucide-react";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Custom hook for data fetching
import { useUserProfile } from "./hooks/useDashboardData";
import { apiClient } from "@/lib/api";

// Zod schema for form validation
const profileSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
});

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { profile, isLoading: isProfileLoading, error: profileError } = useUserProfile();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: { username: "", email: "" },
  });

  const { isSubmitting } = form.formState;

  // Populate the form with fetched data once it's available
  useEffect(() => {
    if (profile) {
      form.reset({
        username: profile.username,
        email: profile.email,
      });
    }
  }, [profile, form]);

  // Handle form submission to update the profile
  async function onSubmit(values: z.infer<typeof profileSchema>) {
    try {
      const response = await apiClient.put("/users/profile", values);
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message === "Validation failed") {
          form.setError("root", { message: "Username must only contain alphanumeric characters." });
          return;
        }
        throw new Error(errorData.message || "Failed to update profile.");
      }

      toast.success("Profile updated successfully!");
      setIsEditing(false);
      // Optionally, you might want to refetch the profile data here
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        form.setError("root", { message: error.message });
      } else {
        form.setError("root", { message: "An unknown error occurred." });
      }
    }
  }

  if (isProfileLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <Skeleton className="h-8 w-32" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-full mt-4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (profileError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{profileError}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="h-full flex flex-col justify-center">
      <Card className="w-full max-w-md shadow-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Your Profile</CardTitle>
          <CardDescription>View and edit your personal information.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {form.formState.errors.root && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Update Failed</AlertTitle>
                  <AlertDescription>{form.formState.errors.root.message}</AlertDescription>
                </Alert>
              )}

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing || isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled // Email is typically not editable
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isEditing ? (
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      if (profile) {
                        form.reset({ username: profile.username, email: profile.email });
                      }
                    }}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    Save Changes
                  </Button>
                </div>
              ) : (
                <Button type="button" variant="primary" onClick={() => setIsEditing(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
