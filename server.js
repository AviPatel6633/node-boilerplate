require("dotenv").config();
const app = require("./app");
const connectDB = require("./src/config/db");
const logger = require("./src/utils/logger");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  // await connectDB(); // wait for DB
  // app.listen(PORT, () => {
  //   logger.info(`🚀 Server running on port ${PORT}`);
  // });

  try {
    await connectDB();

    app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error(`Server failed to start: ${error.message}`);
  }
};

startServer();
const seed = require("./src/config/seed");

// after DB connection
seed();
process.on("SIGINT", async () => {
  logger.info("Shutting down server...");
  await require("mongoose").connection.close();
  process.exit(0);
});

// connectDB();
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });
