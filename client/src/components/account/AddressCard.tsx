"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Address } from "@/features/address/address.types";

interface AddressCardProps {
    address: Address;
    onSetDefault?: (id: string) => void;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export function AddressCard({ address, onSetDefault, onEdit, onDelete }: AddressCardProps) {
    const fullName = `${address.firstName} ${address.lastName}`;
    const displayAddress = `${address.street}, ${address.barangay}, ${address.city}, ${address.province}, ${address.region}, ${address.postalCode}, ${address.country}`;

    return (
        <div className="bg-white p-5 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
            <div className="flex justify-between gap-4">
                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-900 border-r border-gray-200 pr-3">{fullName}</span>
                        <span className="text-sm text-gray-500">{address.phoneNumber}</span>
                    </div>
                    
                    <div className="text-sm text-gray-600 space-y-1">
                        <p>{displayAddress}</p>
                    </div>

                    <div className="flex gap-2 mt-2">
                        {address.isDefault && (
                            <Badge variant="outline" className="text-shopee border-shopee bg-shopee/5 rounded-sm px-2 py-0 text-[10px] font-medium">
                                Default
                            </Badge>
                        )}
                    </div>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                    <div className="flex gap-4">
                        <button 
                            onClick={() => onEdit?.(address.id)}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Edit
                        </button>
                        {!address.isDefault && (
                            <button 
                                onClick={() => onDelete?.(address.id)}
                                className="text-sm text-red-500 hover:text-red-600 font-medium"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={address.isDefault}
                        onClick={() => onSetDefault?.(address.id)}
                        className={address.isDefault ? "opacity-50 cursor-not-allowed" : "border-gray-200 text-gray-700 hover:bg-white hover:border-gray-400"}
                    >
                        Set as Default
                    </Button>
                </div>
            </div>
        </div>
    );
}
