const mongoose = require("mongoose");

const logger = require("./utils/logger");
const config = require("./utils/config");

if (process.env.NODE_ENV !== "test") {
  logger.info("connecting to", config.MONGODB_URI);

  mongoose
    .connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      logger.info("connected to MongoDB");
    })
    .catch((error) => {
      logger.error("error connection to MongoDB:", error.message);
    });
}
