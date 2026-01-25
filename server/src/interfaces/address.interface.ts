import { AddressInput } from "../schemas/address.schema";
import { Address } from "../types/address.types";

export interface IAddressRepository {
    createAddress(input: AddressInput, userId: string): Promise<Address>;
    getAddressesByUserId(userId: string): Promise<Address[]>;
    getAddressById(addressId: string): Promise<Address | null>;
    updateAddress(
        addressId: string,
        input: Partial<AddressInput>,
    ): Promise<Address | null>;
    deleteAddress(addressId: string): Promise<boolean>;
}

export interface IAddressService {
    addAddress(input: AddressInput, userId: string): Promise<Address>;
    listUserAddresses(userId: string): Promise<Address[]>;
    getAddress(addressId: string): Promise<Address | null>;
    modifyAddress(
        addressId: string,
        input: Partial<AddressInput>,
    ): Promise<Address | null>;
    setDefaultAddress(
        userId: string,
        addressId: string,
    ): Promise<Address | null>;
    removeAddress(addressId: string): Promise<boolean>;
}
