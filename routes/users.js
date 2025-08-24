const router = require("express").Router();
const {
  getUsers,
  createUser,
  getCurrentUser,
  updateUserProfile,
  login,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.patch("/me", updateUserProfile);
router.post("/signup", createUser);
router.post("/signin", login);

module.exports = router;
