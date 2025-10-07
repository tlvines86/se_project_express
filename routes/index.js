const router = require("express").Router();
const auth = require("../middlewares/auth");
const { NOT_FOUND_ERROR_CODE } = require("../errors");
const { createUser, login } = require("../controllers/users");
const { getClothingItems } = require("../controllers/clothingItems");

const userRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");

router.post("/signup", createUser);
router.post("/signin", login);
router.get("/items", getClothingItems);

router.use(auth);
router.use("/users", userRouter);
router.use("/items", clothingItemsRouter);

router.use((req, res) => {
  res
    .status(NOT_FOUND_ERROR_CODE)
    .send({ message: "Requested resource not found" });
});

module.exports = router;
