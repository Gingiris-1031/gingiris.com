import { serverEnv } from "@/lib/env/server";

type Level = "debug" | "info" | "warn" | "error";

const order: Record<Level, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

function shouldLog(level: Level): boolean {
  return order[level] >= order[serverEnv.LOG_LEVEL];
}

function emit(level: Level, message: string, meta?: Record<string, unknown>) {
  if (!shouldLog(level)) {
    return;
  }
  const payload = {
    level,
    message,
    meta: meta ?? {},
    ts: new Date().toISOString(),
  };
  // Keep logs structured for ECS aggregation.
  console[level](JSON.stringify(payload));
}

export const logger = {
  debug: (message: string, meta?: Record<string, unknown>) => emit("debug", message, meta),
  info: (message: string, meta?: Record<string, unknown>) => emit("info", message, meta),
  warn: (message: string, meta?: Record<string, unknown>) => emit("warn", message, meta),
  error: (message: string, meta?: Record<string, unknown>) => emit("error", message, meta),
};
