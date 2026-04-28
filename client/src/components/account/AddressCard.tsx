"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, User, Edit2, Trash2 } from "lucide-react";
import { Address } from "@/features/address/address.types";
import { Card, CardContent } from "@/components/ui/card";

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
        <Card className="border-white/40 bg-white/60 backdrop-blur-2xl shadow-xl shadow-black/5 rounded-3xl overflow-hidden transition-all hover:shadow-2xl hover:shadow-black/10 group">
            <CardContent className="p-6 sm:p-8">
                <div className="flex justify-between items-start gap-4">
                    <div className="space-y-4 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-2 px-3 py-1 bg-luxury-charcoal text-white rounded-full text-xs font-medium">
                                <User size={12} />
                                {fullName}
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-white/80 border border-white/60 text-neutral-600 rounded-full text-xs">
                                <Phone size={12} className="text-luxury-gold" />
                                {address.phoneNumber}
                            </div>
                            {address.isDefault && (
                                <Badge className="bg-luxury-gold/10 text-luxury-gold border-luxury-gold/20 hover:bg-luxury-gold/20 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-none">
                                    Default
                                </Badge>
                            )}
                        </div>
                        
                        <div className="flex gap-3 text-neutral-600">
                            <MapPin size={18} className="text-luxury-gold shrink-0 mt-0.5" />
                            <p className="text-sm leading-relaxed font-light">
                                {displayAddress}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEdit?.(address.id)}
                            className="h-9 w-9 rounded-full bg-white/50 border border-white/60 hover:bg-white/80 text-luxury-charcoal transition-all"
                        >
                            <Edit2 size={14} />
                        </Button>
                        {!address.isDefault && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onDelete?.(address.id)}
                                className="h-9 w-9 rounded-full bg-white/50 border border-white/60 hover:bg-red-50 hover:text-red-500 text-luxury-charcoal transition-all"
                            >
                                <Trash2 size={14} />
                            </Button>
                        )}
                    </div>
                </div>

                <div className="mt-8 flex justify-end items-center gap-4 border-t border-black/5 pt-6">
                    {!address.isDefault && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onSetDefault?.(address.id)}
                            className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-luxury-gold transition-colors"
                        >
                            Set as Default
                        </Button>
                    )}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit?.(address.id)}
                        className="bg-white/40 border-white/60 text-luxury-charcoal hover:bg-white/60 hover:border-white/80 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all px-6 shadow-none h-10"
                    >
                        Edit Details
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

