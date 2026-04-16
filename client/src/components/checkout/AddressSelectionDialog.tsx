"use client";

import React from "react";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, CheckCircle2, ChevronRight } from "lucide-react";
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
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden gap-0">
                <DialogHeader className="p-6 border-b border-gray-100">
                    <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <MapPin size={22} className="text-shopee" />
                        Select Delivery Address
                    </DialogTitle>
                </DialogHeader>

                <div className="max-h-[60vh] overflow-y-auto">
                    {addresses.length > 0 ? (
                        <div className="divide-y divide-gray-100">
                            {addresses.map((address) => (
                                <button
                                    key={address.id}
                                    onClick={() => {
                                        onSelect(address.id);
                                        onOpenChange(false);
                                    }}
                                    className={`w-full p-6 text-left transition-all hover:bg-gray-50 flex items-start gap-4 relative group ${
                                        selectedId === address.id ? "bg-shopee/[0.02]" : ""
                                    }`}
                                >
                                    <div className={`mt-1 shrink-0 ${selectedId === address.id ? "text-shopee" : "text-gray-300"}`}>
                                        <CheckCircle2 size={20} fill={selectedId === address.id ? "currentColor" : "none"} />
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-gray-900 truncate">
                                                {address.firstName} {address.lastName}
                                            </span>
                                            <span className="text-gray-400 text-sm">|</span>
                                            <span className="text-gray-600 text-sm">{address.phoneNumber}</span>
                                        </div>
                                        <p className="text-sm text-gray-500 leading-snug break-words">
                                            {address.street}, {address.barangay}, {address.city}, {address.province}, {address.postalCode}
                                        </p>
                                        <div className="mt-2 flex gap-2">
                                            {address.isDefault && (
                                                <span className="text-[10px] font-bold text-shopee bg-shopee/5 px-1.5 py-0.5 rounded border border-shopee/20 uppercase">
                                                    Default
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {selectedId === address.id && (
                                        <div className="absolute top-0 right-0 p-1">
                                            <div className="bg-shopee text-white text-[9px] font-bold px-1.5 py-0.5 rounded-bl-lg uppercase">
                                                Active
                                            </div>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 text-center">
                            <MapPin className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                            <p className="text-gray-500 mb-6">No addresses found.</p>
                            <Button asChild className="bg-shopee hover:bg-shopee-dark">
                                <Link href="/user/address">Add New Address</Link>
                            </Button>
                        </div>
                    )}
                </div>

                <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex justify-center">
                    <Link 
                        href="/user/address" 
                        className="text-sm text-gray-600 hover:text-shopee flex items-center gap-1 font-medium underline underline-offset-4"
                    >
                        Manage Addresses
                        <ChevronRight size={14} />
                    </Link>
                </div>
            </DialogContent>
        </Dialog>
    );
}
