import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/async.middleware";
import { dashboardService } from "../services/dashboard.service";

export class DashboardController {
  getDashboardData = asyncHandler(async (_req: Request, res: Response) => {
    const data = await dashboardService.getDashboardData();

    res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      data,
    });
  });
}

export const dashboardController = new DashboardController();
