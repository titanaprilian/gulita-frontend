import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import BackToHomeButton from "@/components/ui/BackToHomeButton";
import { useAuth } from "@/hooks/useAuth";

// Zod schema for form validation
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const LoginPage = () => {
  const { login } = useAuth();
  const location = useLocation();
  const signupSuccess = location.state?.signupSuccess;

  // Define the form using react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  // Extract isSubmitting state for loading feedback
  const { isSubmitting } = form.formState;

  // Define the submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await login(values);
    } catch (error: unknown) {
      if (error instanceof Error) {
        form.setError("root", {
          type: "manual",
          message: error.message || "An unknown error occurred.",
        });
      } else {
        console.error("Unexpected error:", error);
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <BackToHomeButton />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm mx-auto"
      >
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-blue-600 font-bold">Welcome Back</CardTitle>
            <CardDescription>Log in to access your dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            {signupSuccess && (
              <Alert variant="default" className="mb-6 bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 !text-green-600" />
                <AlertTitle className="text-green-800">Registration Successful!</AlertTitle>
                <AlertDescription className="text-green-700">
                  You can now log in with your new account.
                </AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {form.formState.errors.root && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Login Failed</AlertTitle>
                    <AlertDescription>{form.formState.errors.root.message}</AlertDescription>
                  </Alert>
                )}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="name@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button variant="primary" type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging In...
                    </>
                  ) : (
                    "Log In"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;
