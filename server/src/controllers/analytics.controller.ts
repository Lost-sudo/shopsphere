import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/async.middleware";
import { analyticsService } from "../services/analytics.service";

export class AnalyticsController {
  getAnalyticsData = asyncHandler(async (_req: Request, res: Response) => {
    const data = await analyticsService.getAnalyticsData();

    res.status(200).json({
      success: true,
      message: "Analytics data fetched successfully",
      data,
    });
  });
}

export const analyticsController = new AnalyticsController();
