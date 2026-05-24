import type { FastifyBaseLogger } from "fastify";

export type Logger = FastifyBaseLogger;

export const loggerConfig = {
  level: process.env["LOG_LEVEL"] ?? "info",
  formatters: {
    level: (label: string) => ({ level: label }),
  },
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
  base: {
    service: process.env["SERVICE_NAME"] ?? "unknown",
    version: process.env["SERVICE_VERSION"] ?? "0.0.0",
  },
};
