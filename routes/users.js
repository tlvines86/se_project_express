const router = require("express").Router();
const {
  getUsers,
  createUser,
  getUserById,
  login,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/signup", createUser);
router.post("/login", login);

module.exports = router;
