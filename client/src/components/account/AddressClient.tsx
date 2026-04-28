"use client";

import React, { useState } from "react";
import { Plus, MapPin } from "lucide-react";
import { useGetAddressesQuery, useSetDefaultAddressMutation, useDeleteAddressMutation } from "@/features/address/address.api";
import { AddressCard } from "@/components/account/AddressCard";
import { Button } from "@/components/ui/button";
import { AddressDialog } from "@/components/account/AddressDialog";
import { toast } from "sonner";
import { Address } from "@/features/address/address.types";

export function AddressClient() {
    const [setDefault] = useSetDefaultAddressMutation();
    const [deleteAddress] = useDeleteAddressMutation();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    
    const { data, isLoading } = useGetAddressesQuery();
    const addresses = data?.addresses || [];

    const handleSetDefault = async (id: string) => {
        try {
            await setDefault(id).unwrap();
            toast.success("Default address updated");
        } catch {
            toast.error("Failed to update default address");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this address?")) return;
        try {
            await deleteAddress(id).unwrap();
            toast.success("Address deleted");
        } catch {
            toast.error("Failed to delete address");
        }
    };

    const handleAddAddress = () => {
        setSelectedAddress(null);
        setIsDialogOpen(true);
    };

    const handleEditAddress = (id: string) => {
        const address = addresses.find((a) => a.id === id);
        if (address) {
            setSelectedAddress(address);
            setIsDialogOpen(true);
        }
    };

    return (
        <div className="p-8 sm:p-12 space-y-10">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 animate-fade-up">
                    <div>
                        <h1 className="text-4xl font-light tracking-tight text-luxury-charcoal">
                            My <span className="font-serif italic text-luxury-gold">Addresses</span>
                        </h1>
                        <p className="text-neutral-500 mt-2 font-light">
                            Manage your shipping and billing locations
                        </p>
                    </div>
                    <Button 
                        onClick={handleAddAddress}
                        className="bg-luxury-charcoal hover:bg-luxury-charcoal-light text-white h-12 px-8 rounded-xl shadow-lg shadow-black/5 uppercase tracking-[0.2em] text-xs font-semibold transition-all active:scale-95 flex gap-2 items-center"
                    >
                        <Plus size={16} />
                        Add New Address
                    </Button>
                </div>

                <div className="animate-fade-up [animation-delay:100ms]">
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-48 bg-white/40 backdrop-blur-xl border border-white/60 animate-pulse rounded-3xl" />
                            ))}
                        </div>
                    ) : addresses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {addresses.map((address) => (
                                <AddressCard 
                                    key={address.id} 
                                    address={address} 
                                    onSetDefault={handleSetDefault}
                                    onEdit={handleEditAddress}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 px-4 bg-white/60 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-xl shadow-black/5">
                            <div className="w-20 h-20 bg-luxury-gold/10 rounded-full flex items-center justify-center mb-6">
                                <MapPin className="text-luxury-gold" size={32} />
                            </div>
                            <p className="text-luxury-charcoal font-medium">No addresses found</p>
                            <p className="text-neutral-500 text-sm mt-1">Start by adding your first shipping location</p>
                            <Button 
                                variant="link" 
                                className="text-luxury-gold hover:text-luxury-gold-light mt-4 font-semibold uppercase tracking-widest text-[10px]"
                                onClick={handleAddAddress}
                            >
                                Add your first address now
                            </Button>
                        </div>
                    )}
                </div>
            
            <AddressDialog 
                open={isDialogOpen} 
                onOpenChange={setIsDialogOpen} 
                address={selectedAddress}
            />
        </div>
    );
}

