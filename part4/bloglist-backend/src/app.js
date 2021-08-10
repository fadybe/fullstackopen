const express = require("express");
const cors = require("cors");

require("express-async-errors");

const blogRouter = require("./controllers/blog");
const userRouter = require("./controllers/user");
const middleware = require("./utils/middleware");
const loginRouter = require("./controllers/login");

const app = express();

require("./db");

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.extractToken);
app.use("/api/blogs", middleware.userExtractor, blogRouter);
app.use("/api", userRouter);
app.use("/api", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
