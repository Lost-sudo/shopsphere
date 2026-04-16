"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ProfileClient() {
    const user = useSelector((state: RootState) => state.auth.user);

    if (!user) return (
        <div className="p-6 md:p-8 animate-pulse">
            <div className="h-8 w-48 bg-gray-100 rounded mb-8"></div>
            <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-10 bg-gray-50 rounded"></div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="p-6 md:p-8">
            <div className="border-b border-gray-100 pb-4 mb-8">
                <h1 className="text-lg font-medium text-gray-900">My Profile</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Manage and protect your account
                </p>
            </div>

            <div className="flex flex-col-reverse md:flex-row gap-8">
                {/* Form Section */}
                <div className="flex-1 max-w-2xl">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] items-center gap-4">
                            <label className="text-sm text-gray-500 md:text-right">Username</label>
                            <div className="text-sm text-gray-900">{user.email.split("@")[0]}</div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] items-center gap-4">
                            <label className="text-sm text-gray-500 md:text-right">Name</label>
                            <Input 
                                defaultValue={user.name || ""} 
                                className="h-10 focus-visible:ring-shopee"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] items-center gap-4">
                            <label className="text-sm text-gray-500 md:text-right">Email</label>
                            <div className="text-sm text-gray-900 flex items-center gap-2">
                                {user.email}
                                <button type="button" className="text-blue-600 hover:underline text-xs">Change</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] items-center gap-4">
                            <label className="text-sm text-gray-500 md:text-right">Phone Number</label>
                            <div className="text-sm text-gray-900 flex items-center gap-2">
                                *********89
                                <button type="button" className="text-blue-600 hover:underline text-xs">Change</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] items-center gap-4">
                            <label className="text-sm text-gray-500 md:text-right">Gender</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input type="radio" name="gender" className="accent-shopee w-4 h-4" /> Male
                                </label>
                                <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input type="radio" name="gender" className="accent-shopee w-4 h-4" /> Female
                                </label>
                                <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input type="radio" name="gender" className="accent-shopee w-4 h-4" /> Other
                                </label>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] items-center gap-4">
                            <label className="text-sm text-gray-500 md:text-right">Date of birth</label>
                            <div className="flex gap-2">
                                <select className="h-10 px-3 border border-gray-200 rounded-sm bg-white text-sm focus:outline-shopee">
                                    {Array.from({length: 31}, (_, i) => (
                                        <option key={i+1} value={i+1}>{i+1}</option>
                                    ))}
                                </select>
                                <select className="h-10 px-3 border border-gray-200 rounded-sm bg-white text-sm focus:outline-shopee">
                                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                                        <option key={month} value={month}>{month}</option>
                                    ))}
                                </select>
                                <select className="h-10 px-3 border border-gray-200 rounded-sm bg-white text-sm focus:outline-shopee">
                                    {Array.from({length: 100}, (_, i) => (
                                        <option key={2024-i} value={2024-i}>{2024-i}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 pt-4">
                            <div></div>
                            <Button 
                                type="button"
                                className="bg-shopee hover:bg-shopee/90 text-white w-24 h-10 rounded-sm shadow-sm"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
