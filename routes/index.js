const router = require("express").Router();
const auth = require("../middlewares/auth");
const { NOT_FOUND_ERROR_CODE } = require("../utils/errors");

const userRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");

router.use("/items", clothingItemsRouter);

router.use(auth);
router.use("/users", userRouter);

router.use((req, res) => {
  res
    .status(NOT_FOUND_ERROR_CODE)
    .send({ message: "Requested resource not found" });
});

module.exports = router;
