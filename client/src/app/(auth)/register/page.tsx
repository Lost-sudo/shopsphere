"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { registerSchema, RegisterFormValues } from "@/schemas/auth/auth.schema";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    setIsLoading(true);
    console.log(values);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    toast.success("Account created successfully!");
    router.push("/verify-email");
  }

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl mx-auto py-8">
      {/* Illustration Section */}
      <div className="hidden lg:flex flex-col items-center justify-center text-gray-800 max-w-md text-center">
        <div className="relative w-full aspect-square mb-6 scale-110 drop-shadow-xl">
          <Image
            src="/images/auth/illustration.png"
            alt="Secure Register Illustration"
            fill
            className="object-contain"
          />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-shopee">
          Start Your Journey With Us
        </h2>
        <p className="text-gray-600 font-medium leading-relaxed">
          Create an account to track orders, manage your profile, and receive
          exclusive offers.
        </p>
      </div>

      {/* Register Card */}
      <Card className="w-full max-w-[420px] shadow-2xl border-none p-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <CardContent className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign Up</h2>
            <p className="text-sm text-gray-700 font-medium font-sans">
              Create your account. It&apos;s free and only takes a minute.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-bold uppercase text-gray-800 tracking-wider">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        className="h-12 border-gray-200 focus-visible:ring-shopee"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs font-medium" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold uppercase text-gray-500 tracking-wider">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your@email.com"
                        className="h-12 border-gray-200 focus-visible:ring-shopee"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs font-medium" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold uppercase text-gray-500 tracking-wider">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="h-12 border-gray-200 focus-visible:ring-shopee"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs font-medium" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold uppercase text-gray-500 tracking-wider">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="h-12 border-gray-200 focus-visible:ring-shopee"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs font-medium" />
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <p className="text-[11px] text-gray-700 text-center mb-4 leading-normal font-medium">
                  By clicking &quot;Sign Up&quot;, you agree to our{" "}
                  <Link
                    href="/terms"
                    className="text-blue-600 hover:text-blue-700 hover:underline font-bold"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-blue-600 hover:text-blue-700 hover:underline font-bold"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-shopee hover:bg-shopee-dark text-white font-bold text-base shadow-lg shadow-shopee/20 uppercase tracking-widest transition-all active:scale-[0.98]"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Signing Up...
                    </div>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-700">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-700 font-bold hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
