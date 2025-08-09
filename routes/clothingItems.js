const router = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItemById,
} = require("../controllers/clothingItems");

router.get("/", getClothingItems);
router.post("/", createClothingItem);
router.delete("/:itemId", deleteClothingItemById);

module.exports = router;
