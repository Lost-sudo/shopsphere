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
import { Card, CardContent } from "@/components/ui/card";
import { registerSchema, RegisterFormValues } from "@/schemas/auth/auth.schema";
import { useRegisterMutation } from "@/features/auth/auth.api";

export default function RegisterPage() {
    const router = useRouter();
    const [register, { isLoading }] = useRegisterMutation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(values: RegisterFormValues) {
        try {
            const registerData = {
                name: values.name,
                email: values.email,
                password: values.password,
            };
            const response = await register(registerData).unwrap();

            if (response.success) {
                toast.success(response.message);
                router.push("/verify-email");
            } else {
                toast.error(response.message);
            }
        } catch (err: unknown) {
            const error = err as { status?: number; data?: { message?: string } };
            console.error("Registration Error:", error);
            const errorMessage =
                error?.data?.message ||
                "Something went wrong. Please try again.";
            toast.error(errorMessage);
        }
    }

    return (
        <div className="relative min-h-[calc(100vh-200px)] flex items-center justify-center overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
            {/* Background Animated Blobs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-luxury-gold/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob" />
            <div className="absolute top-0 -right-4 w-72 h-72 bg-neutral-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob [animation-delay:2000ms]" />
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-stone-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob [animation-delay:4000ms]" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl mx-auto w-full">
                {/* Illustration Section */}
                <div className="hidden lg:flex flex-col items-center justify-center text-gray-800 max-w-md text-center animate-fade-up">
                    <div className="relative w-full aspect-[4/5] mb-8 drop-shadow-2xl animate-float overflow-hidden rounded-2xl ring-1 ring-white/20">
                        <Image
                            src="/images/auth/fashion_illustration.png"
                            alt="Premium Fashion Register"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-4xl font-light tracking-tight text-luxury-charcoal sm:text-5xl">
                            Start Your <span className="font-serif italic text-luxury-gold">Journey</span> With Us
                        </h2>
                        <p className="text-base text-neutral-500 font-normal leading-relaxed max-w-sm mx-auto">
                            Join the definitive destination for premium fashion and exclusive collections.
                        </p>
                    </div>
                </div>

                {/* Register Card */}
                <Card className="w-full max-w-[460px] shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/40 bg-white/60 backdrop-blur-2xl animate-fade-up [animation-delay:200ms] rounded-2xl">
                    <CardContent className="p-8 sm:p-10">
                        <div className="mb-8 text-center lg:text-left">
                            <h2 className="text-2xl font-semibold text-luxury-charcoal mb-2 tracking-tight">
                                Create Account
                            </h2>
                            <p className="text-sm text-neutral-500 tracking-wide">
                                Join ShopSphere today. Experience fashion elevated.
                            </p>
                        </div>

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-5"
                            >
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="animate-fade-up [animation-delay:300ms]">
                                                <FormLabel className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest">
                                                    Full Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="John Doe"
                                                        className="h-12 bg-white/50 border-white/60 focus-visible:ring-luxury-gold focus-visible:bg-white/80 transition-all duration-300 rounded-xl"
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
                                            <FormItem className="animate-fade-up [animation-delay:400ms]">
                                                <FormLabel className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest">
                                                    Email Address
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="name@company.com"
                                                        className="h-12 bg-white/50 border-white/60 focus-visible:ring-luxury-gold focus-visible:bg-white/80 transition-all duration-300 rounded-xl"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-xs font-medium" />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem className="animate-fade-up [animation-delay:500ms]">
                                                    <FormLabel className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest">
                                                        Password
                                                    </FormLabel>
                                                    <FormControl>
                                                        <div className="relative group">
                                                            <Input
                                                                type={showPassword ? "text" : "password"}
                                                                placeholder="••••••••"
                                                                className="h-12 bg-white/50 border-white/60 focus-visible:ring-luxury-gold focus-visible:bg-white/80 transition-all duration-300 pr-10 rounded-xl"
                                                                {...field}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowPassword(!showPassword)}
                                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                                                            >
                                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                            </button>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage className="text-xs font-medium" />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="confirmPassword"
                                            render={({ field }) => (
                                                <FormItem className="animate-fade-up [animation-delay:550ms]">
                                                    <FormLabel className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest">
                                                        Confirm
                                                    </FormLabel>
                                                    <FormControl>
                                                        <div className="relative group">
                                                            <Input
                                                                type={showConfirmPassword ? "text" : "password"}
                                                                placeholder="••••••••"
                                                                className="h-12 bg-white/50 border-white/60 focus-visible:ring-luxury-gold focus-visible:bg-white/80 transition-all duration-300 pr-10 rounded-xl"
                                                                {...field}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                                                            >
                                                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                            </button>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage className="text-xs font-medium" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="pt-2 animate-fade-up [animation-delay:600ms]">
                                    <p className="text-[11px] text-neutral-500 text-center mb-5 leading-relaxed font-medium">
                                        By clicking &quot;Create Account&quot;, you agree to our{" "}
                                        <Link href="/terms" className="text-luxury-charcoal hover:text-luxury-gold font-semibold uppercase tracking-wider transition-colors">Terms</Link> and{" "}
                                        <Link href="/privacy" className="text-luxury-charcoal hover:text-luxury-gold font-semibold uppercase tracking-wider transition-colors">Privacy Policy</Link>.
                                    </p>
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full h-12 bg-luxury-charcoal hover:bg-luxury-charcoal-light text-white font-medium text-sm shadow-xl shadow-black/5 uppercase tracking-[0.15em] transition-all duration-300 active:scale-[0.98] rounded-xl"
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                                                <span>Setting up...</span>
                                            </div>
                                        ) : (
                                            "Create Account"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>

                        <div className="mt-8 pt-6 border-t border-black/5 text-center animate-fade-up [animation-delay:700ms]">
                            <p className="text-xs text-neutral-500 font-medium tracking-wide">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="text-luxury-charcoal hover:text-luxury-gold font-semibold transition-all uppercase tracking-wider ml-1"
                                >
                                    Log In
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
