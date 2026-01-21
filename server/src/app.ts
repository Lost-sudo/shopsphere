import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { globalErrorHandler } from "./middlewares/error.middleware";
import { notFound } from "./middlewares/notFound.middleware";

const app: Express = express();

// Global Middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Routes
app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
        status: "OK",
        message: "ShopSphere API is running",
    });
});

// 404 Handler - must come after all routes
app.use(notFound);

// Global Error Handler - must be the last middleware
app.use(globalErrorHandler);

export default app;
