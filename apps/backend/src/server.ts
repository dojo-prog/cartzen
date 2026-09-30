import http from "http";
import checkDbConn from "./database/check";
import app from "./app";
import ENV from "./config/env";
import "./database/init";
import pool from "./database/db";

const startServer = async () => {
  try {
    await checkDbConn();

    const server = http.createServer(app);

    server.on("error", (err) => {
      console.error("Server encountered an error", err);
      process.exit(1);
    });

    server.listen(ENV.PORT, "0.0.0.0", () => {
      console.log(`Server is listening on port ${ENV.PORT}`);
    });

    const shutdown = (signal: string) => {
      console.log(`${signal} received. Starting graceful shutdown...`);

      server.close(async () => {
        console.log("HTTP server closed");

        try {
          await pool.end();

          console.log("Database pool closed");

          process.exit(1);
        } catch (error) {
          console.error("Error during graceful shutdown:", error);
          process.exit(1);
        }
      });
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();
