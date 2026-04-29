"use client";

import React from "react";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, ChevronRight } from "lucide-react";
import { Address } from "@/features/address/address.types";
import Link from "next/link";

interface AddressSelectionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    addresses: Address[];
    selectedId: string | null;
    onSelect: (id: string) => void;
}

export function AddressSelectionDialog({
    open,
    onOpenChange,
    addresses,
    selectedId,
    onSelect
}: AddressSelectionDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden gap-0 rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]">
                <DialogHeader className="p-8 border-b border-gray-100/50 bg-white/40">
                    <DialogTitle className="text-2xl font-light text-[#1a1a1a] flex items-center gap-3 font-serif">
                        Select Delivery Address
                    </DialogTitle>
                </DialogHeader>

                <div className="max-h-[50vh] overflow-y-auto">
                    {addresses.length > 0 ? (
                        <div className="p-4 space-y-3 bg-white/20">
                            {addresses.map((address) => (
                                <button
                                    key={address.id}
                                    onClick={() => {
                                        onSelect(address.id);
                                        onOpenChange(false);
                                    }}
                                    className={`w-full p-6 text-left transition-all duration-300 rounded-2xl border flex items-start gap-4 relative overflow-hidden ${
                                        selectedId === address.id 
                                            ? "bg-white/90 border-[#c5a059] shadow-sm ring-1 ring-[#c5a059]/20" 
                                            : "bg-white/50 border-transparent hover:bg-white/80 hover:border-gray-200"
                                    }`}
                                >
                                    <div className="mt-1 shrink-0 transition-colors">
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedId === address.id ? 'border-[#c5a059]' : 'border-gray-300'}`}>
                                             {selectedId === address.id && <div className="w-2.5 h-2.5 rounded-full bg-[#c5a059]" />}
                                        </div>
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-medium text-[#1a1a1a] truncate text-lg">
                                                {address.firstName} {address.lastName}
                                            </span>
                                            <span className="text-gray-300 text-sm font-light">|</span>
                                            <span className="text-gray-500 text-sm font-light">{address.phoneNumber}</span>
                                        </div>
                                        <p className="text-sm text-gray-500 leading-relaxed font-light break-words">
                                            {address.street}, {address.barangay}, {address.city}, {address.province}, {address.postalCode}
                                        </p>
                                        <div className="mt-3 flex gap-2">
                                            {address.isDefault && (
                                                <span className="text-[10px] uppercase tracking-widest bg-[#1a1a1a] text-white px-2 py-1 rounded-full">
                                                    Default
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="p-16 text-center bg-white/20">
                            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" strokeWidth={1} />
                            <p className="text-gray-500 font-light mb-8">No addresses found in your profile.</p>
                            <Button asChild className="bg-[#1a1a1a] hover:bg-[#2c2c2c] text-white rounded-full px-8 h-12 transition-transform hover:scale-105 duration-300">
                                <Link href="/user/address">Add New Address</Link>
                            </Button>
                        </div>
                    )}
                </div>

                <div className="p-6 bg-white/40 border-t border-gray-100/50 flex justify-center">
                    <Link 
                        href="/user/address" 
                        className="text-sm text-gray-500 hover:text-[#1a1a1a] flex items-center gap-1 font-medium transition-colors"
                    >
                        Manage Addresses
                        <ChevronRight size={14} />
                    </Link>
                </div>
            </DialogContent>
        </Dialog>
    );
}
