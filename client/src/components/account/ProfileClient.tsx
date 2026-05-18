"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Camera, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ProfileClient() {
    const user = useSelector((state: RootState) => state.auth.user);

    if (!user) return (
        <div className="p-6 md:p-8 animate-pulse space-y-8">
            <div className="h-10 w-64 bg-neutral-200/50 rounded-lg"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 h-64 bg-neutral-100/50 rounded-2xl"></div>
                <div className="lg:col-span-2 h-96 bg-neutral-100/50 rounded-2xl"></div>
            </div>
        </div>
    );

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-8">
            {/* Header Section */}
            <div className="animate-fade-up">
                <h1 className="text-4xl font-light tracking-tight text-luxury-charcoal">
                    My <span className="font-serif italic text-luxury-gold">Profile</span>
                </h1>
                <p className="text-neutral-500 mt-2 font-light">
                    Manage your account settings and personal information
                </p>
            </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Profile Card */}
                    <Card className="lg:col-span-1 border-white/40 bg-white/60 backdrop-blur-2xl shadow-xl shadow-black/5 rounded-3xl overflow-hidden animate-fade-up [animation-delay:100ms]">
                        <CardContent className="p-8 flex flex-col items-center text-center">
                            <div className="relative group mb-6">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg ring-1 ring-luxury-gold/20">
                                    <div className="w-full h-full bg-luxury-charcoal flex items-center justify-center text-white text-4xl font-light">
                                        {user.name?.[0] || user.email[0].toUpperCase()}
                                    </div>
                                </div>
                                <button className="absolute bottom-0 right-0 p-2 bg-luxury-gold text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                                    <Camera size={18} />
                                </button>
                            </div>
                            
                            <h2 className="text-xl font-semibold text-luxury-charcoal">{user.name || "User"}</h2>
                            <p className="text-sm text-neutral-500 mb-6">{user.email}</p>
                            
                            <div className="w-full space-y-3">
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/40 border border-white/60 text-sm text-luxury-charcoal">
                                    <ShieldCheck size={18} className="text-luxury-gold" />
                                    <span>Verified Account</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Right Column: Details Form */}
                    <Card className="lg:col-span-2 border-white/40 bg-white/60 backdrop-blur-2xl shadow-xl shadow-black/5 rounded-3xl animate-fade-up [animation-delay:200ms]">
                        <CardContent className="p-6 sm:p-8">
                            <form className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest flex items-center gap-2">
                                        <User size={12} className="text-luxury-gold" />
                                        Full Name
                                    </label>
                                    <Input 
                                        defaultValue={user.name || ""} 
                                        className="h-12 w-full bg-white/50 border-white/60 focus-visible:ring-luxury-gold focus-visible:bg-white/80 transition-all rounded-xl"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest flex items-center gap-2">
                                        <Mail size={12} className="text-luxury-gold" />
                                        Email Address
                                    </label>
                                    <div className="flex gap-2">
                                        <Input 
                                            readOnly
                                            defaultValue={user.email} 
                                            className="h-12 bg-neutral-100/50 border-white/60 text-neutral-500 cursor-not-allowed rounded-xl flex-1"
                                        />
                                        <Button type="button" className="h-12 shrink-0 bg-white/40 border border-white/60 text-luxury-charcoal hover:bg-white/60 hover:border-white/80 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all px-6 shadow-none">
                                            Change
                                        </Button>
                                    </div>
                                </div>



                                <div className="h-px bg-black/5 w-full" />

                                <div className="flex justify-end pt-4">
                                    <Button 
                                        type="button"
                                        className="bg-luxury-charcoal hover:bg-luxury-charcoal-light text-white h-12 px-12 rounded-xl shadow-lg shadow-black/5 uppercase tracking-[0.2em] text-xs font-semibold transition-all active:scale-95"
                                    >
                                        Save Changes
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
            </div>
        </div>
    );
}

