const router = require("express").Router();
const { getCurrentUser, updateUserProfile } = require("../controllers/users");
const { validateUser } = require("../middleware/validation");

router.get("/me", getCurrentUser);

router.patch("/me", validateUser, updateUserProfile);

module.exports = router;
