import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/async.middleware";
import { AddressService } from "../services/address.service";
import { AddressInput, UpdateAddressInput } from "../schemas/address.schema";

export class AddressController {
    constructor(private addressService: AddressService) {}

    createAddress = asyncHandler(async (req: Request, res: Response) => {
        const input = req.body as AddressInput;
        const userId = req.user!.id;

        const address = await this.addressService.addAddress(input, userId);

        res.status(201).json({
            success: true,
            message: "Address created successfully",
            address,
        });
    });

    getUserAddresses = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user!.id;

        const addresses = await this.addressService.listUserAddresses(userId);

        res.status(200).json({
            success: true,
            message: "Addresses retrieved successfully",
            addresses,
        });
    });

    getAddress = asyncHandler(async (req: Request, res: Response) => {
        const addressId = req.params.id as string;

        const address = await this.addressService.getAddress(addressId);

        res.status(200).json({
            success: true,
            message: "Address retrieved successfully",
            address,
        });
    });

    updateAddress = asyncHandler(async (req: Request, res: Response) => {
        const addressId = req.params.id as string;
        const input = req.body as Partial<UpdateAddressInput>;

        const address = await this.addressService.modifyAddress(
            addressId,
            input,
        );

        res.status(200).json({
            success: true,
            message: "Address updated successfully",
            address,
        });
    });

    setDefaultAddress = asyncHandler(async (req: Request, res: Response) => {
        const addressId = req.params.id as string;
        const userId = req.user!.id;

        const address = await this.addressService.setDefaultAddress(
            userId,
            addressId,
        );

        res.status(200).json({
            success: true,
            message: "Default address set successfully",
        });
    });

    deleteAddress = asyncHandler(async (req: Request, res: Response) => {
        const addressId = req.params.id as string;

        await this.addressService.removeAddress(addressId);

        res.status(200).json({
            success: true,
            message: "Address deleted successfully",
        });
    });
}
