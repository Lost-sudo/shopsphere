import { IAddressService, IAddressRepository } from "../interfaces/address.interface";
import { AddressInput, UpdateAddressInput } from "../schemas/address.schema";
import { Address } from "../types/address.types";
import { AppError } from "../utils/errors/appError";
import { BadRequestError } from "../utils/errors/badRequestError";
import { NotFoundError } from "../utils/errors/notFoundError";

export class AddressService implements IAddressService {
    constructor(private addressRepository: IAddressRepository) {}
    async addAddress(input: AddressInput, userId: string): Promise<Address> {
        const newAddress = await this.addressRepository.createAddress(
            input,
            userId,
        );

        if (!newAddress) {
            throw new AppError("Failed to add address", 500);
        }

        return newAddress;
    }
    async listUserAddresses(userId: string): Promise<Address[]> {
        const addresses =
            await this.addressRepository.getAddressesByUserId(userId);

        if (!addresses) {
            throw new BadRequestError("No addresses found for this user");
        }

        return addresses;
    }
    async getAddress(addressId: string): Promise<Address | null> {
        const address = await this.addressRepository.getAddressById(addressId);

        if (!address) {
            throw new NotFoundError("Address with the given ID not found");
        }

        return address;
    }
    async modifyAddress(
        addressId: string,
        input: Partial<UpdateAddressInput>,
    ): Promise<Address | null> {
        const isExisting =
            await this.addressRepository.getAddressById(addressId);

        if (!isExisting) {
            throw new NotFoundError("Address with the given ID not found");
        }

        const updatedAddress = await this.addressRepository.updateAddress(
            addressId,
            input,
        );

        if (!updatedAddress) {
            throw new AppError("Failed to update address", 500);
        }

        return updatedAddress;
    }
    async setDefaultAddress(
        userId: string,
        addressId: string,
    ): Promise<Address | null> {
        const address = await this.addressRepository.getAddressById(addressId);

        if (!address || address.userId !== userId) {
            throw new NotFoundError(
                "Address not found or does not belong to the user",
            );
        }

        const defaultAddress = await this.addressRepository.updateAddress(
            addressId,
            {
                isDefault: true,
            },
        );

        if (!defaultAddress) {
            throw new AppError("Failed to set default address", 500);
        }

        return defaultAddress;
    }
    async removeAddress(addressId: string): Promise<boolean> {
        return await this.addressRepository.deleteAddress(addressId);
    }
}
