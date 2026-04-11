"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
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
import { loginSchema, LoginFormValues } from "@/schemas/auth/auth.schema";
import { useLoginMutation } from "@/features/auth/auth.api";
import { useDispatch } from "react-redux";
import { setUser } from "@/features/auth/auth.slice";

export default function LoginPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: LoginFormValues) {
        try {
            const response = await login(values).unwrap();
            if (response.success) {
                dispatch(setUser(response));
                toast.success("Welcome back!");
                router.push("/");
            } else {
                toast.error(response.message || "Login failed");
            }
        } catch (err: unknown) {
            const error = err as { status?: number; data?: { message?: string } };
            console.error("Login Error:", error);
            const errorMessage =
                error?.data?.message ||
                "Something went wrong. Please try again.";
            toast.error(errorMessage);
        }
    }

    return (
        <div className="relative min-h-[calc(100vh-200px)] flex items-center justify-center overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
            {/* Background Animated Blobs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-shopee/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
            <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob [animation-delay:2000ms]" />
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob [animation-delay:4000ms]" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl mx-auto w-full">
                {/* Illustration Section */}
                <div className="hidden lg:flex flex-col items-center justify-center text-gray-800 max-w-md text-center animate-fade-up">
                    <div className="relative w-full aspect-square mb-6 scale-110 drop-shadow-2xl animate-float">
                        <Image
                            src="/images/auth/illustration.png"
                            alt="Secure Login Illustration"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                            The World&apos;s <span className="text-shopee">Premium</span> Marketplace
                        </h2>
                        <p className="text-lg text-gray-600 font-medium leading-relaxed max-w-sm mx-auto">
                            Join millions of users and experience the best shopping
                            experience in ShopSphere.
                        </p>
                    </div>
                </div>

                {/* Login Card */}
                <Card className="w-full max-w-[440px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-none bg-white/80 backdrop-blur-xl animate-fade-up [animation-delay:200ms]">
                    <CardContent className="p-8 sm:p-10">
                        <div className="mb-10 text-center lg:text-left">
                            <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
                                Welcome Back
                            </h2>
                            <p className="text-gray-500 font-medium tracking-tight">
                                Please enter your details to sign in
                            </p>
                        </div>

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                <div className="space-y-5">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className="animate-fade-up [animation-delay:300ms]">
                                                <FormLabel className="text-xs font-bold uppercase text-gray-500 tracking-widest">
                                                    Email Address
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="name@company.com"
                                                        className="h-13 bg-gray-50/50 border-gray-200 focus-visible:ring-shopee focus-visible:bg-white transition-all duration-300"
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
                                            <FormItem className="animate-fade-up [animation-delay:400ms]">
                                                <div className="flex justify-between items-center">
                                                    <FormLabel className="text-xs font-bold uppercase text-gray-500 tracking-widest">
                                                        Password
                                                    </FormLabel>
                                                    <Link
                                                        href="/forgot-password"
                                                        className="text-xs text-shopee hover:text-shopee-dark transition-colors font-bold"
                                                    >
                                                        Forgot password?
                                                    </Link>
                                                </div>
                                                <FormControl>
                                                    <div className="relative group">
                                                        <Input
                                                            type={
                                                                showPassword
                                                                    ? "text"
                                                                    : "password"
                                                            }
                                                            placeholder="••••••••"
                                                            className="h-13 bg-gray-50/50 border-gray-200 focus-visible:ring-shopee focus-visible:bg-white transition-all duration-300 pr-12"
                                                            {...field}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setShowPassword(
                                                                    !showPassword,
                                                                )
                                                            }
                                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                                                        >
                                                            {showPassword ? (
                                                                <EyeOff className="h-5 w-5" />
                                                            ) : (
                                                                <Eye className="h-5 w-5" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage className="text-xs font-medium" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex items-center space-x-2 animate-fade-up [animation-delay:500ms]">
                                    <Checkbox id="remember" className="border-gray-300 data-[state=checked]:bg-shopee data-[state=checked]:border-shopee" />
                                    <label
                                        htmlFor="remember"
                                        className="text-sm text-gray-600 font-medium cursor-pointer select-none"
                                    >
                                        Keep me logged in
                                    </label>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-13 bg-shopee hover:bg-shopee-dark text-white font-bold text-base shadow-xl shadow-shopee/20 uppercase tracking-[0.2em] transition-all duration-300 active:scale-[0.98] animate-fade-up [animation-delay:600ms]"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                                            <span>One moment...</span>
                                        </div>
                                    ) : (
                                        "Sign In"
                                    )}
                                </Button>
                            </form>
                        </Form>

                        <div className="mt-10 pt-8 border-t border-gray-100 text-center animate-fade-up [animation-delay:700ms]">
                            <p className="text-sm text-gray-500 font-medium">
                                Don&apos;t have an account?{" "}
                                <Link
                                    href="/register"
                                    className="text-shopee hover:underline font-bold transition-all"
                                >
                                    Create one now
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
