const router = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItemById,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getClothingItems);
router.post("/", createClothingItem);
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", dislikeItem);
router.delete("/:itemId", deleteClothingItemById);

module.exports = router;
