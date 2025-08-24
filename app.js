const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const indexRouter = require("./routes/index");
const { createUser, login } = require("./controllers/users");

const { PORT = 3001, MONGO_URL = "mongodb://127.0.0.1:27017/wtwr_db" } =
  process.env;

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/signup", createUser);
app.post("/signin", login);
app.use("/", indexRouter);

app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
