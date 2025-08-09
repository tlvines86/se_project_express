const ClothingItem = require("../models/clothingItem");

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).json(items))
    .catch((err) => res.status(500).json({ error: err.message }));
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl, owner } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).json(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    });
};

const deleteClothingItemById = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .then((item) => {
      if (!item) {
        return res.status(404).json({ error: "Clothing item not found" });
      }
      return res.status(200).json({ message: "Item deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(400).json({ error: "Invalid item ID format" });
      }
      return res.status(500).json({ error: "Internal server error" });
    });
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItemById,
};
