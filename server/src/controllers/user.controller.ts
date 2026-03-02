import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/async.middleware";
import { UserSerive } from "../services/user.service";

export class UserController {
    constructor(private userService: UserSerive) { }
    getAllUser = asyncHandler(async (req: Request, res: Response) => {
        const users = await this.userService.getAllUser();

        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            users,
        });
    });
}