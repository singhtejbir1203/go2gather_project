import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, json, errors } = winston.format;

// log format
const logFormat = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  errors({ stack: true }),
  json(),
);

// Daily rotating file for all logs
const combinedTransport = new DailyRotateFile({
  filename: "logs/%DATE%-combined.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
});

// Daily rotating file for error logs
const errorTransport = new DailyRotateFile({
  filename: "logs/%DATE%-error.log",
  datePattern: "YYYY-MM-DD",
  level: "error",
  maxFiles: "30d",
});

// Winston logger
const logger = winston.createLogger({
  level: "info",
  format: logFormat,
  transports: [combinedTransport, errorTransport],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

export default logger;
