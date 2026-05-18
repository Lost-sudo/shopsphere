"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Loader2, CheckCircle2 } from "lucide-react";
import { useUpdateProfileMutation, useUpdateEmailMutation } from "@/features/user/user.api";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/features/auth/auth.slice";
import { toast } from "sonner";
import type { User as UserType } from "@/features/auth/auth.types";

interface SettingsProfileProps {
    user: UserType;
}

export function SettingsProfile({ user }: SettingsProfileProps) {
    const dispatch = useDispatch();
    const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();
    const [updateEmail, { isLoading: isUpdatingEmail }] = useUpdateEmailMutation();

    const [name, setName] = useState(user.name || "");
    const [email, setEmail] = useState(user.email);

    const handleNameSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || name.trim().length < 3) {
            toast.error("Name must be at least 3 characters.");
            return;
        }
        try {
            const result = await updateProfile({ name: name.trim() }).unwrap();
            dispatch(setAuthUser({ success: true, message: "Name updated", user: result.user }));
            toast.success("Profile name updated successfully.");
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to update name.");
        }
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) {
            toast.error("Email is required.");
            return;
        }
        try {
            const result = await updateEmail({ email: email.trim() }).unwrap();
            dispatch(setAuthUser({ success: true, message: "Email updated", user: result.user }));
            toast.success("A verification email has been sent to confirm your new email address.");
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to update email.");
        }
    };

    return (
        <Card className="border-white/40 bg-white/60 backdrop-blur-2xl shadow-xl shadow-black/5 rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-8 pb-4">
                <CardTitle className="text-xl font-light tracking-tight text-luxury-charcoal">
                    Profile <span className="font-serif italic text-luxury-gold">Information</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                {/* Name Form */}
                <form onSubmit={handleNameSubmit} className="space-y-4">
                    <Label htmlFor="name" className="text-[10px] font-bold uppercase text-neutral-400 tracking-[0.2em]">
                        <User className="w-3 h-3 inline mr-1.5" />
                        Full Name
                    </Label>
                    <div className="flex gap-3">
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your full name"
                            className="h-12 flex-1 border-white/60 bg-white/40 rounded-xl text-sm text-luxury-charcoal placeholder:text-neutral-300 focus-visible:ring-luxury-gold/30"
                        />
                        <Button
                            type="submit"
                            disabled={isUpdatingProfile || name === (user.name || "")}
                            className="h-12 px-6 bg-luxury-charcoal hover:bg-luxury-charcoal-light text-white rounded-xl uppercase tracking-widest text-[10px] font-bold transition-all active:scale-95"
                        >
                            {isUpdatingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
                        </Button>
                    </div>
                </form>

                {/* Email Form */}
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <Label htmlFor="email" className="text-[10px] font-bold uppercase text-neutral-400 tracking-[0.2em]">
                        <Mail className="w-3 h-3 inline mr-1.5" />
                        Email Address
                    </Label>
                    <div className="flex gap-3">
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email address"
                            className="h-12 flex-1 border-white/60 bg-white/40 rounded-xl text-sm text-luxury-charcoal placeholder:text-neutral-300 focus-visible:ring-luxury-gold/30"
                        />
                        <Button
                            type="submit"
                            disabled={isUpdatingEmail || email === user.email}
                            className="h-12 px-6 bg-luxury-charcoal hover:bg-luxury-charcoal-light text-white rounded-xl uppercase tracking-widest text-[10px] font-bold transition-all active:scale-95"
                        >
                            {isUpdatingEmail ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
                        </Button>
                    </div>
                    {user.emailVerified && (
                        <p className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold uppercase tracking-widest">
                            <CheckCircle2 className="w-3 h-3" />
                            Email verified
                        </p>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}
