import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/async.middleware";
import { UserService } from "../services/user.service";

export class UserController {
  constructor(private userService: UserService) {}
  getAllUser = asyncHandler(async (req: Request, res: Response) => {
    const users = await this.userService.getAllUser();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  });

  getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.userService.getProfile(req.user!.id);

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  });

  getUserById = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.userService.getProfileById(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  });

  updateUserName = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.userService.updateUserName(req.user!.id, req.body);

    res.status(200).json({
      success: true,
      message: "User name updated successfully",
      user,
    });
  });

  updateUserEmail = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.userService.updateUserEmail(req.user!.id, req.body);

    res.status(200).json({
      success: true,
      message: "User email updated successfully",
      user,
    });
  });

  updateUserPassword = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.userService.updateUserPassword(
      req.user!.id,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: "User password updated successfully",
      user,
    });
  });

  deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.userService.deleteUser(req.user!.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user,
    });
  });
}
