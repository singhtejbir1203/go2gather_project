import logger from "./logger.js";

export const logDbOperation = ({
  operation,
  model,
  documentId,
  userId = null,
  metadata = {},
}) => {
  logger.info("DB Operation", {
    operation,
    model,
    documentId,
    userId,
    metadata,
    timestamp: new Date().toISOString(),
  });
};
