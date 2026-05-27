import app from "./app";
import { connectDBs, disconnectDBs } from "./config/connection";

const port = process.env.PORT || 5000;

async function startServer() {
    // Graceful Connection
    await connectDBs();

    const server = app.listen(port, '0.0.0.0', () => {
        console.log(
            `⚡️[server]: Server is running at http://0.0.0.0:${port}`,
        );
    });

    // Graceful Shutdown Logic
    const gracefulShutdown = (signal: string) => {
        console.log(`\n${signal} received. Starting graceful shutdown...`);

        server.close(async () => {
            console.log("HTTP server closed.");

            // Close database connections
            await disconnectDBs();

            console.log("Graceful shutdown complete. Exiting.");
            process.exit(0);
        });

        // If server takes too long to close, force exit
        setTimeout(() => {
            console.error(
                "Could not close connections in time, forcefully shutting down",
            );
            process.exit(1);
        }, 10000);
    };

    // Process Listeners
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
}

startServer();
