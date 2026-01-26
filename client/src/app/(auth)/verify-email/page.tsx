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
        <div className="max-w-[480px] mx-auto py-8 transition-all animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Card className="shadow-2xl border-none overflow-hidden">
                <CardContent className="p-0">
                    <div className="bg-shopee p-8 flex flex-col items-center text-white text-center">
                        <div className="bg-white/20 p-4 rounded-full mb-6 relative">
                            <Mail size={48} className="text-white" />
                            <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-shopee flex items-center justify-center">
                                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">
                            Check Your Email
                        </h2>
                        <p className="text-white/80 text-sm font-light max-w-[280px]">
                            We&apos;ve sent a verification link to your inbox.
                        </p>
                    </div>

                    <div className="p-8 space-y-8">
                        <div className="space-y-4 text-center">
                            <p className="text-gray-700 leading-relaxed">
                                Thank you for joining{" "}
                                <span className="text-shopee font-bold">
                                    ShopSphere
                                </span>
                                ! To start shopping, please click the link in
                                the email we sent to your address.
                            </p>
                            <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-100 flex flex-col gap-2">
                                <p className="text-xs text-gray-500 italic">
                                    Can&apos;t find the email? Check your spam
                                    or junk folder.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Button
                                onClick={handleResend}
                                disabled={isResending || countdown > 0}
                                variant="outline"
                                className="w-full h-12 border-shopee text-shopee hover:bg-shopee/5 font-bold uppercase tracking-wider transition-all"
                            >
                                {isResending ? (
                                    <RefreshCw
                                        size={18}
                                        className="animate-spin mr-2"
                                    />
                                ) : countdown > 0 ? (
                                    `Resend in ${countdown}s`
                                ) : (
                                    "Resend Verification Email"
                                )}
                            </Button>

                            <Link href="/login" className="block">
                                <Button className="w-full h-12 bg-gray-900 hover:bg-black text-white font-bold uppercase tracking-wider flex items-center justify-center gap-2 group">
                                    Go to Login
                                    <ArrowRight
                                        size={18}
                                        className="group-hover:translate-x-1 transition-transform"
                                    />
                                </Button>
                            </Link>
                        </div>

                        <p className="text-center text-xs text-gray-400">
                            Mistyped your email?{" "}
                            <Link
                                href="/register"
                                className="text-blue-600 hover:underline font-bold"
                            >
                                Sign up again
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
