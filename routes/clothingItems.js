const router = require("express").Router();
const {
  createClothingItem,
  deleteClothingItemById,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

const {
  validateClothingItem,
  validateIdParam,
} = require("../middleware/validation");

router.post("/", validateClothingItem, createClothingItem);

router.put("/:id/likes", validateIdParam, likeItem);

router.delete("/:id/likes", validateIdParam, dislikeItem);

router.delete("/:id", validateIdParam, deleteClothingItemById);

module.exports = router;
