const router = require("express").Router();
const {
  createClothingItem,
  deleteClothingItemById,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.post("/", createClothingItem);
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", dislikeItem);
router.delete("/:itemId", deleteClothingItemById);

module.exports = router;
