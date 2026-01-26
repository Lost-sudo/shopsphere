import prisma from "../config/db";
import { IAddressRepository } from "../interfaces/address.interface";
import { AddressInput, UpdateAddressInput } from "../schemas/address.schema";
import { Address } from "../types/address.types";

export class AddressRepository implements IAddressRepository {
    async createAddress(input: AddressInput, userId: string): Promise<Address> {
        return prisma.address.create({
            data: {
                ...input,
                userId,
            },
        });
    }
    async getAddressesByUserId(userId: string): Promise<Address[]> {
        return prisma.address.findMany({
            where: {
                userId,
            },
        });
    }
    async getAddressById(addressId: string): Promise<Address | null> {
        return prisma.address.findUnique({
            where: {
                id: addressId,
            },
        });
    }
    async updateAddress(
        addressId: string,
        input: Partial<UpdateAddressInput>,
    ): Promise<Address | null> {
        return prisma.address.update({
            where: {
                id: addressId,
            },
            data: {
                ...input,
            },
        });
    }
    async deleteAddress(addressId: string): Promise<boolean> {
        await prisma.address.delete({
            where: {
                id: addressId,
            },
        });
        return true;
    }
}
