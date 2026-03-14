const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const routes = require("./src/routes");
const errorHandler = require("./src/middlewares/error.middleware");
const ApiError = require("./src/utils/ApiError");

const app = express();

/* ===============================
   CORS Configuration
================================ */
const corsOptions = {
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

/* ===============================
   Security & Utility Middlewares
================================ */
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));

/* ===============================
   Body Parsers
================================ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("query parser", "extended");

/* ===============================
   Routes
================================ */
app.use("/api/v1", routes);

/* ===============================
   404 Route Handler
================================ */
app.use((req, res, next) => {
  next(new ApiError(404, "Route not found"));
});

/* ===============================
   Global Error Handler
================================ */
app.use(errorHandler);

module.exports = app;