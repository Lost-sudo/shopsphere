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
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { loginSchema, LoginFormValues } from "@/schemas/auth/auth";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: LoginFormValues) {
        setIsLoading(true);
        console.log(values);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsLoading(false);
        toast.success("Welcome back!");
        router.push("/");
    }

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl mx-auto py-8">
            {/* Illustration Section */}
            <div className="hidden lg:flex flex-col items-center justify-center text-gray-800 max-w-md text-center">
                <div className="relative w-full aspect-square mb-6 scale-110 drop-shadow-xl">
                    <Image
                        src="/images/auth/illustration.png"
                        alt="Secure Login Illustration"
                        fill
                        className="object-contain"
                    />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-shopee">
                    The World&apos;s Premium Marketplace
                </h2>
                <p className="text-gray-600 font-medium leading-relaxed">
                    Join millions of users and experience the best shopping
                    experience in ShopSphere.
                </p>
            </div>

            {/* Login Card */}
            <Card className="w-full max-w-[420px] shadow-2xl border-none p-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <CardContent className="p-8">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Login
                        </h2>
                        <p className="text-sm text-gray-700 font-medium font-sans">
                            Welcome back! Please enter your details.
                        </p>
                    </div>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[11px] font-bold uppercase text-gray-800 tracking-wider">
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
                                        <div className="flex justify-between items-center">
                                            <FormLabel className="text-[11px] font-bold uppercase text-gray-800 tracking-wider">
                                                Password
                                            </FormLabel>
                                            <Link
                                                href="/forgot-password"
                                                className="text-xs text-blue-600 hover:text-blue-700 hover:underline font-bold"
                                            >
                                                Forgot password?
                                            </Link>
                                        </div>
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

                            <div className="flex items-center space-x-2">
                                <Checkbox id="remember" />
                                <label
                                    htmlFor="remember"
                                    className="text-sm text-gray-800 font-medium cursor-pointer"
                                >
                                    Remember me
                                </label>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 bg-shopee hover:bg-shopee-dark text-white font-bold text-base shadow-lg shadow-shopee/20 uppercase tracking-widest transition-all active:scale-[0.98]"
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        Logging in...
                                    </div>
                                ) : (
                                    "Log In"
                                )}
                            </Button>
                        </form>
                    </Form>

                    <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-700">
                            New to ShopSphere?{" "}
                            <Link
                                href="/register"
                                className="text-blue-600 hover:text-blue-700 font-bold hover:underline"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
