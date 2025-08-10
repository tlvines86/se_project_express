const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
} = require("../utils/errors");

const getClothingItems = (req, res) => {
  return ClothingItem.find({})
    .then((items) => res.status(200).json(items))
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .json({ message: "Internal server error" });
    });
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  if (!req.user || !req.user._id) {
    return res
      .status(UNAUTHORIZED_ERROR_CODE)
      .json({ message: "Unauthorized: User not authenticated" });
  }

  return ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
  })
    .then((item) => res.status(201).json(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .json({ message: "Invalid clothing item data" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .json({ message: "Internal server error" });
    });
};

const deleteClothingItemById = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .then((item) => {
      if (!item) {
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .json({ message: "Clothing item not found" });
      }
      return res.status(200).json({ message: "Item deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .json({ message: "Invalid item ID format" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .json({ message: "Internal server error" });
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
        : res.status(NOT_FOUND_ERROR_CODE).json({ message: "Item not found" })
    )
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .json({ message: "Error liking item" });
    });

const dislikeItem = async (req, res) => {
  try {
    const item = await ClothingItem.findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    );
    if (!item) {
      return res
        .status(NOT_FOUND_ERROR_CODE)
        .send({ message: "Item not found." });
    }
    return res.status(200).send(item);
  } catch (err) {
    console.error(err);
    return res
      .status(INTERNAL_SERVER_ERROR_CODE)
      .send({ message: "An error occurred." });
  }
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItemById,
  likeItem,
  dislikeItem,
};
