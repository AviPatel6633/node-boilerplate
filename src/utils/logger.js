const winston = require("winston");

const isProduction = process.env.NODE_ENV === "production";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

// Wrapper for dev vs prod
const log = {
  info: (message) => {
    if (isProduction) {
      logger.info(message);
    } else {
      console.log(message);
    }
  },

  warn: (message) => {
    if (isProduction) {
      logger.warn(message);
    } else {
      console.warn(message);
    }
  },

  error: (message) => {
    if (isProduction) {
      logger.error(message);
    } else {
      console.error(message);
    }
  },
};

module.exports = log;