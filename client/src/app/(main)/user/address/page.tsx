"use client";

import React, { useState } from "react";
import { Plus, MapPin } from "lucide-react";
import { 
    useGetAddressesQuery, 
    useSetDefaultAddressMutation, 
    useDeleteAddressMutation 
} from "@/features/address/address.api";
import { AddressCard } from "@/components/account/AddressCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AddressDialog } from "@/components/account/AddressDialog";
import { toast } from "sonner";
import { Address } from "@/features/address/address.types";

export default function AddressPage() {
    const { data, isLoading } = useGetAddressesQuery();
    const [setDefault] = useSetDefaultAddressMutation();
    const [deleteAddress] = useDeleteAddressMutation();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

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
        <div className="flex flex-col min-h-full">
            <div className="p-6 md:p-8 flex justify-between items-center border-b border-gray-100">
                <h1 className="text-lg font-medium text-gray-900">My Addresses</h1>
                <Button 
                    onClick={handleAddAddress}
                    className="bg-shopee hover:bg-shopee/90 text-white rounded-sm h-10 flex gap-2"
                >
                    <Plus size={18} />
                    Add New Address
                </Button>
            </div>

            <div className="flex-1">
                {isLoading ? (
                    <div className="p-6 space-y-6">
                        {[1, 2].map((i) => (
                            <Skeleton key={i} className="h-32 w-full rounded-sm" />
                        ))}
                    </div>
                ) : addresses.length > 0 ? (
                    <div className="divide-y divide-gray-100">
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
                    <div className="flex flex-col items-center justify-center py-24 px-4">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <MapPin className="text-gray-300" size={32} />
                        </div>
                        <p className="text-gray-600">You haven&apos;t added any addresses yet.</p>
                        <Button 
                            variant="link" 
                            className="text-shopee mt-2"
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
