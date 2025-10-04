const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
require("dotenv").config();

const indexRouter = require("./routes/index");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3001, MONGO_URL = "mongodb://127.0.0.1:27017/wtwr_db" } =
  process.env;

const app = express();

app.use(cors());
app.use(express.json());

app.use(requestLogger);

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/", indexRouter);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  console.error(err.stack);

  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

module.exports = app;
