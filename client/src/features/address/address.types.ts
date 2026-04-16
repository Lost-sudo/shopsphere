export type Address = {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    street: string;
    barangay: string;
    city: string;
    province: string;
    region: string;
    country: string;
    postalCode: string;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
}

export type GetAddressesResponse = { 
    success: boolean;
    message?: string;
    addresses: Address[];
};

export type GetAddressResponse = {
    success: boolean;
    message?: string;
    address: Address;
};

export type CreateAddressRequest = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    street: string;
    barangay: string;
    city: string;
    province: string;
    region: string;
    country: string;
    postalCode: string;
    isDefault?: boolean;
}

export type CreateAddressResponse = {
    success: boolean;
    message?: string;
    address: Address;
};

export type UpdateAddressRequest = Partial<CreateAddressRequest> & { id: string };

export type UpdateAddressResponse = {
    success: boolean;
    message?: string;
    address: Address;
};
export type DeleteAddressResponse = {
    success: boolean;
    message?: string;
}