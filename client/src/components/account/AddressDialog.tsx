"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { addressSchema, AddressSchema } from "@/schemas/address/address.schema";
import { useCreateAddressMutation, useUpdateAddressMutation } from "@/features/address/address.api";
import { Address } from "@/features/address/address.types";
import { Loader2, MapPin, User, Phone } from "lucide-react";

interface AddressDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    address?: Address | null;
}

export function AddressDialog({ open, onOpenChange, address }: AddressDialogProps) {
    const isEdit = !!address;
    const [createAddress, { isLoading: isCreating }] = useCreateAddressMutation();
    const [updateAddress, { isLoading: isUpdating }] = useUpdateAddressMutation();

    const form = useForm<AddressSchema>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            street: "",
            barangay: "",
            city: "",
            province: "",
            region: "",
            country: "Philippines",
            postalCode: "",
            isDefault: false,
        },
    });

    useEffect(() => {
        if (address && open) {
            form.reset({
                firstName: address.firstName,
                lastName: address.lastName,
                phoneNumber: address.phoneNumber,
                street: address.street,
                barangay: address.barangay,
                city: address.city,
                province: address.province,
                region: address.region,
                country: address.country,
                postalCode: address.postalCode,
                isDefault: address.isDefault,
            });
        } else if (!open) {
            form.reset({
                firstName: "",
                lastName: "",
                phoneNumber: "",
                street: "",
                barangay: "",
                city: "",
                province: "",
                region: "",
                country: "Philippines",
                postalCode: "",
                isDefault: false,
            });
        }
    }, [address, open, form]);

    const onSubmit = async (data: AddressSchema) => {
        try {
            if (isEdit && address) {
                await updateAddress({ id: address.id, ...data }).unwrap();
                toast.success("Address updated successfully");
            } else {
                await createAddress(data).unwrap();
                toast.success("Address added successfully");
            }
            onOpenChange(false);
        } catch {
            toast.error(isEdit ? "Failed to update address" : "Failed to add address");
        }
    };

    const isLoading = isCreating || isUpdating;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[640px] max-h-[90vh] overflow-y-auto border-white/40 bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-0">
                <DialogHeader className="p-8 pb-0">
                    <DialogTitle className="text-3xl font-light tracking-tight text-luxury-charcoal">
                        {isEdit ? "Edit" : "New"} <span className="font-serif italic text-luxury-gold">Address</span>
                    </DialogTitle>
                    <p className="text-neutral-500 text-sm mt-2 font-light">
                        Enter the destination details for your premium deliveries
                    </p>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 pt-6 pb-12 space-y-8">
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest flex items-center gap-2">
                                                <User size={12} className="text-luxury-gold" />
                                                First Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. John" className="h-12 bg-white/50 border-white/60 focus-visible:ring-luxury-gold focus-visible:bg-white/80 transition-all rounded-xl" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-[10px]" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest flex items-center gap-2">
                                                <User size={12} className="text-luxury-gold" />
                                                Last Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Doe" className="h-12 bg-white/50 border-white/60 focus-visible:ring-luxury-gold focus-visible:bg-white/80 transition-all rounded-xl" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-[10px]" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest flex items-center gap-2">
                                            <Phone size={12} className="text-luxury-gold" />
                                            Phone Number
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="+63 900 000 0000" className="h-12 bg-white/50 border-white/60 focus-visible:ring-luxury-gold focus-visible:bg-white/80 transition-all rounded-xl" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />

                            <div className="pt-4 border-t border-black/5 space-y-6">
                                <div className="flex items-center gap-2">
                                    <MapPin size={14} className="text-luxury-gold" />
                                    <h3 className="text-[10px] font-bold uppercase text-luxury-charcoal tracking-widest">Location Details</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="region"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest">Region</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Region" className="h-12 bg-white/50 border-white/60 focus-visible:ring-luxury-gold focus-visible:bg-white/80 transition-all rounded-xl" {...field} />
                                                </FormControl>
                                                <FormMessage className="text-[10px]" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="province"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest">Province</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Province" className="h-12 bg-white/50 border-white/60 focus-visible:ring-luxury-gold focus-visible:bg-white/80 transition-all rounded-xl" {...field} />
                                                </FormControl>
                                                <FormMessage className="text-[10px]" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest">City/Municipality</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="City" className="h-12 bg-white/50 border-white/60 focus-visible:ring-luxury-gold focus-visible:bg-white/80 transition-all rounded-xl" {...field} />
                                                </FormControl>
                                                <FormMessage className="text-[10px]" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="barangay"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest">Barangay</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Barangay" className="h-12 bg-white/50 border-white/60 focus-visible:ring-luxury-gold focus-visible:bg-white/80 transition-all rounded-xl" {...field} />
                                                </FormControl>
                                                <FormMessage className="text-[10px]" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="postalCode"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest">Postal Code</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Postal Code" className="h-12 bg-white/50 border-white/60 focus-visible:ring-luxury-gold focus-visible:bg-white/80 transition-all rounded-xl" {...field} />
                                                </FormControl>
                                                <FormMessage className="text-[10px]" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="country"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest">Country</FormLabel>
                                                <FormControl>
                                                    <Input readOnly className="h-12 bg-neutral-100/50 border-white/60 text-neutral-500 rounded-xl" {...field} />
                                                </FormControl>
                                                <FormMessage className="text-[10px]" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="street"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest">Street Name, Building, House No.</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Street Address" className="h-12 bg-white/50 border-white/60 focus-visible:ring-luxury-gold focus-visible:bg-white/80 transition-all rounded-xl" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-[10px]" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <FormField
                            control={form.control}
                            name="isDefault"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-2xl border border-white/60 bg-white/40 p-4 transition-all hover:bg-white/60">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="data-[state=checked]:bg-luxury-charcoal data-[state=checked]:border-luxury-charcoal"
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="text-xs font-medium text-neutral-600 cursor-pointer">
                                            Set as default address
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-4 pt-4">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => onOpenChange(false)}
                                disabled={isLoading}
                                className="h-12 px-8 rounded-xl text-xs font-semibold uppercase tracking-widest text-neutral-400 hover:text-luxury-charcoal transition-colors"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="bg-luxury-charcoal hover:bg-luxury-charcoal-light text-white h-12 px-12 rounded-xl shadow-lg shadow-black/5 uppercase tracking-[0.2em] text-xs font-semibold transition-all active:scale-95 min-w-[160px]"
                            >
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : isEdit ? (
                                    "Save Changes"
                                ) : (
                                    "Add Address"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

