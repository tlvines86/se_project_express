const ClothingItem = require("../models/clothingItem");

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).json(items))
    .catch((err) => res.status(500).json({ message: err.message }));
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl, owner } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).json(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    });
};

const deleteClothingItemById = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .then((item) => {
      if (!item) {
        return res.status(404).json({ message: "Clothing item not found" });
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

const likeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((item) =>
      item
        ? res.status(200).json(item)
        : res.status(404).json({ message: "Item not found" })
    )
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: "Error liking item" });
    });

const dislikeItem = async (req, res) => {
  try {
    const item = await ClothingItem.findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    );
    if (!item) {
      return res.status(404).send({ message: "Item not found." });
    }
    return res.status(200).send(item);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "An error occurred." });
  }
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItemById,
  likeItem,
  dislikeItem,
};
