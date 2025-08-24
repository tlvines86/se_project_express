const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
  CONFLICT_ERROR_CODE,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).json(users))
    .catch((err) => {
      console.error(err);
      res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .json({ message: "Internal server error" });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) => {
      const userObject = user.toObject();
      delete userObject.password;
      res.status(201).json(userObject);
    })
    .catch((err) => {
      console.error(err);

      if (err.code === 11000) {
        return res
          .status(CONFLICT_ERROR_CODE)
          .json({ message: "Email already exists" });
      }

      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .json({ message: "Invalid user data" });
      }

      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .json({ message: "Internal server error" });
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
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .json({ message: "User not found" });
      }

      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .json({ message: "Invalid user ID format" });
      }

      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .json({ message: "Internal server error" });
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      console.error(err);

      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .json({ message: "User not found" });
      }

      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .json({ message: "Internal server error" });
    });
};

const updateUserProfile = (req, res) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      console.error(err);

      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .json({ message: "Invalid data" });
      }

      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .json({ message: "User not found" });
      }

      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .json({ message: "Internal server error" });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BAD_REQUEST_ERROR_CODE)
      .json({ message: "Email and password are required" });
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(() => {
      res
        .status(UNAUTHORIZED_ERROR_CODE)
        .json({ message: "Incorrect email or password" });
    });
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  getCurrentUser,
  updateUserProfile,
  login,
};
