export type Address = {
    map(arg0: (a: any) => { type: "Addresses"; id: any; }): unknown;
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

export type ApiEnvelope<TData> = {
    success: boolean;
    message?: string;
    data: TData;
}

export type GetAddressesResponse = ApiEnvelope<{ addresses: Address[] }>;
export type GetAddressResponse = ApiEnvelope<{ address: Address }>;
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
    isDefault?: false | boolean;
}

export type CreateAddressResponse = ApiEnvelope<{address: Address }>;
export type UpdateAddressRequest = Partial<CreateAddressRequest>;
export type UpdateAddressResponse = ApiEnvelope<{ address: Address }>;
export type DeleteAddressResponse = {
    success: boolean;
    message?: string;
}