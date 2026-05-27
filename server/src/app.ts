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
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);
app.use(morgan("dev"));
const allowedOrigins = [
  ...(process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(",").map((url) => url.trim())
    : []),
  /\.vercel\.app$/,
  ...(process.env.NODE_ENV === "development"
    ? [/^http:\/\/localhost:\d+$/, /^http:\/\/192\.168\.\d{1,3}\.\d{1,3}:\d+$/]
    : []),
].filter(Boolean) as (string | RegExp)[];

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.some((o) =>
          typeof o === "string" ? o === origin : o.test(origin),
        )
      ) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV !== "production") {
  app.use("/public", express.static(path.join(process.cwd(), "public")));
}

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
