"use client";

import Link from "next/link";
import { Mail, ArrowRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function VerifyEmailPage() {
    const [isResending, setIsResending] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const handleResend = async () => {
        setIsResending(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        toast.success("Verification email resent!");
        setIsResending(false);
        setCountdown(60);
    };

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    return (
        <div className="relative min-h-[calc(100vh-200px)] flex items-center justify-center overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
            {/* Background Animated Blobs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-shopee/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
            <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob [animation-delay:2000ms]" />
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob [animation-delay:4000ms]" />

            <div className="relative z-10 w-full max-w-[480px] animate-fade-up">
                <Card className="shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-none overflow-hidden bg-white/80 backdrop-blur-xl">
                    <CardContent className="p-0">
                        <div className="bg-shopee p-10 flex flex-col items-center text-white text-center">
                            <div className="bg-white/20 p-5 rounded-full mb-6 relative animate-float">
                                <Mail size={56} className="text-white" />
                                <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-shopee flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                </div>
                            </div>
                            <h2 className="text-3xl font-extrabold mb-3 tracking-tight">
                                Check Your Email
                            </h2>
                            <p className="text-white/90 text-base font-medium max-w-[300px] leading-relaxed">
                                We&apos;ve sent a verification link to your inbox.
                            </p>
                        </div>

                        <div className="p-8 sm:p-10 space-y-8">
                            <div className="space-y-4 text-center animate-fade-up [animation-delay:300ms]">
                                <p className="text-gray-600 font-medium leading-relaxed">
                                    Thank you for joining{" "}
                                    <span className="text-shopee font-bold">
                                        ShopSphere
                                    </span>
                                    ! To start shopping, please click the link in
                                    the email we sent to your address.
                                </p>
                                <div className="p-4 bg-gray-50/50 rounded-xl border border-gray-100 flex flex-col gap-2">
                                    <p className="text-xs text-gray-400 italic font-medium">
                                        Can&apos;t find the email? Check your spam
                                        or junk folder.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4 animate-fade-up [animation-delay:400ms]">
                                <Button
                                    onClick={handleResend}
                                    disabled={isResending || countdown > 0}
                                    variant="outline"
                                    className="w-full h-13 border-shopee text-shopee hover:bg-shopee/5 font-bold uppercase tracking-[0.15em] transition-all duration-300"
                                >
                                    {isResending ? (
                                        <div className="flex items-center gap-2">
                                            <RefreshCw size={18} className="animate-spin" />
                                            <span>Sending...</span>
                                        </div>
                                    ) : countdown > 0 ? (
                                        `Resend in ${countdown}s`
                                    ) : (
                                        "Resend Verification Email"
                                    )}
                                </Button>

                                <Link href="/login" className="block">
                                    <Button className="w-full h-13 bg-gray-900 hover:bg-black text-white font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-2 group transition-all duration-300 shadow-lg shadow-black/10">
                                        Go to Login
                                        <ArrowRight
                                            size={18}
                                            className="group-hover:translate-x-1 transition-transform"
                                        />
                                    </Button>
                                </Link>
                            </div>

                            <p className="text-center text-xs text-gray-500 font-medium animate-fade-up [animation-delay:500ms]">
                                Mistyped your email?{" "}
                                <Link
                                    href="/register"
                                    className="text-shopee hover:underline font-bold transition-all"
                                >
                                    Sign up again
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
