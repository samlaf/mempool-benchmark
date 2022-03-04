import { ILogObject, Logger } from "tslog";
import { appendFileSync } from "fs";

function logToTransport(logObject: ILogObject) {
  appendFileSync("errorLogs.txt", JSON.stringify(logObject) + "\n");
}

const logger: Logger = new Logger();
logger.attachTransport(
  {
    silly: logToTransport,
    debug: logToTransport,
    trace: logToTransport,
    info: logToTransport,
    warn: logToTransport,
    error: logToTransport,
    fatal: logToTransport,
  },
  "error"
);

export function getDefaultLogger() {
  return logger;
}