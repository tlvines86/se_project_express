const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const { createUser, login } = require("./controllers/users");

const app = express();
const { PORT = 3001 } = process.env;

const cors = require("cors");

app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

app.use(express.json());

app.post("/signup", createUser);
app.post("/signin", login);

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
