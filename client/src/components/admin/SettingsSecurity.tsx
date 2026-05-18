"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useUpdatePasswordMutation } from "@/features/user/user.api";
import { toast } from "sonner";

export function SettingsSecurity() {
    const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!password) {
            toast.error("Password is required.");
            return;
        }

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            await updatePassword({ password }).unwrap();
            toast.success("Password updated successfully. A verification email has been sent.");
            setPassword("");
            setConfirmPassword("");
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to update password.");
        }
    };

    return (
        <Card className="border-white/40 bg-white/60 backdrop-blur-2xl shadow-xl shadow-black/5 rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-8 pb-4">
                <CardTitle className="text-xl font-light tracking-tight text-luxury-charcoal">
                    Account <span className="font-serif italic text-luxury-gold">Security</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                {/* Password Form */}
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <Label htmlFor="password" className="text-[10px] font-bold uppercase text-neutral-400 tracking-[0.2em]">
                            <Lock className="w-3 h-3 inline mr-1.5" />
                            New Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
                                className="h-12 w-full border-white/60 bg-white/40 rounded-xl text-sm text-luxury-charcoal placeholder:text-neutral-300 focus-visible:ring-luxury-gold/30 pr-12"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-luxury-charcoal transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Label htmlFor="confirmPassword" className="text-[10px] font-bold uppercase text-neutral-400 tracking-[0.2em]">
                            <Shield className="w-3 h-3 inline mr-1.5" />
                            Confirm Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={showConfirm ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                                className="h-12 w-full border-white/60 bg-white/40 rounded-xl text-sm text-luxury-charcoal placeholder:text-neutral-300 focus-visible:ring-luxury-gold/30 pr-12"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-luxury-charcoal transition-colors"
                            >
                                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading || !password || !confirmPassword}
                        className="h-12 px-8 bg-luxury-charcoal hover:bg-luxury-charcoal-light text-white rounded-xl uppercase tracking-widest text-[10px] font-bold transition-all active:scale-95 w-full"
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                        Update Password
                    </Button>

                    <p className="text-[10px] text-neutral-400 font-light leading-relaxed">
                        Password must be at least 8 characters and contain at least one uppercase letter,
                        one lowercase letter, one number, and one special character.
                    </p>
                </form>
            </CardContent>
        </Card>
    );
}
