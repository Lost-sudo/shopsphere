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
import { Loader2 } from "lucide-react";

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
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl font-medium">
                        {isEdit ? "Edit Address" : "New Address"}
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="First Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Last Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Phone Number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-4 pt-2 border-t border-gray-100 mt-4">
                            <h3 className="text-sm font-medium text-gray-500">Address Details</h3>
                            
                            <FormField
                                control={form.control}
                                name="region"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Region</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Region" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="province"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Province</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Province" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City/Municipality</FormLabel>
                                            <FormControl>
                                                <Input placeholder="City" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="barangay"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Barangay</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Barangay" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="postalCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Postal Code</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Postal Code" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="street"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Street Name, Building, House No.</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Street Address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="isDefault"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Set as default address
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                            <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => onOpenChange(false)}
                                disabled={isLoading}
                                className="rounded-sm px-8 h-10 border-gray-200 text-gray-700"
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                disabled={isLoading}
                                className="bg-shopee hover:bg-shopee/90 text-white rounded-sm px-8 h-10 min-w-[120px]"
                            >
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : isEdit ? (
                                    "Save Changes"
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
