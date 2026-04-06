import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middlewares/error.middleware";
import { notFound } from "./middlewares/notFound.middleware";
import dotenv from "dotenv";
dotenv.config();

import routes from "./routes";

const app: Express = express();

// Global Middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/public", express.static(path.join(process.cwd(), "public")));

// Routes
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    message: "ShopSphere API is running",
  });
});

app.use("/api/v1", routes);

// 404 Handler - must come after all routes
app.use(notFound);

// Global Error Handler - must be the last middleware
app.use(globalErrorHandler);

export default app;
