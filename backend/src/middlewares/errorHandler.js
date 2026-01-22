import logger from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  logger.error("Unhandled Error", {
    message: err.message,
    stack: err.stack,
    statusCode,
    method: req.method,
    url: req.originalUrl,
    userId: req.user?._id || "guest",
    ip: req.ip,
    timestamp: new Date().toISOString(),
  });

  res.status(statusCode).json({
    message: statusCode === 500 ? "Internal server error" : err.message,
  });
};

export default errorHandler;
