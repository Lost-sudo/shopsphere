"use client";

import { SettingsProfile } from "@/components/admin/SettingsProfile";
import { SettingsSecurity } from "@/components/admin/SettingsSecurity";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Store } from "lucide-react";

export default function SettingsPage() {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <div className="space-y-12 animate-fade-up">
            {/* Page Header */}
            <div>
                <h1 className="text-4xl font-light tracking-tight text-luxury-charcoal">
                    Settings <span className="font-serif italic text-luxury-gold">Configuration</span>
                </h1>
                <p className="mt-2 text-neutral-500 font-light">
                    Manage your account settings and preferences.
                </p>
            </div>

            {user && (
                <div className="grid gap-8 lg:grid-cols-2 animate-fade-up [animation-delay:100ms]">
                    <SettingsProfile user={user} />
                    <SettingsSecurity />
                </div>
            )}

            {/* Store Settings - Future */}
            <div className="animate-fade-up [animation-delay:200ms]">
                <Card className="border-dashed border-white/40 bg-white/30 backdrop-blur-2xl shadow-xl shadow-black/5 rounded-[2.5rem] overflow-hidden">
                    <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-luxury-gold/10 rounded-full flex items-center justify-center mb-4">
                            <Store className="w-7 h-7 text-luxury-gold" />
                        </div>
                        <h3 className="text-xl font-light tracking-tight text-luxury-charcoal">
                            Store <span className="font-serif italic text-luxury-gold">Settings</span>
                        </h3>
                        <p className="text-neutral-500 text-sm mt-2 max-w-[400px] font-light">
                            Store-wide configuration options including shipping rates, payment gateways,
                            tax settings, and more will be available here in a future update.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
