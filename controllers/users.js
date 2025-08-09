const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(500).json({ message: err.message }));
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).json(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json({ message: err.message });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).json({ message: "User not found" });
      }
      if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid user ID format" });
      }
      return res.status(500).json({ message: "Internal server error" });
    });
};

module.exports = { getUsers, createUser, getUserById };
