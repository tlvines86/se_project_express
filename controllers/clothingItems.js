const ClothingItem = require("../models/clothingItem");
const {
  BadRequestError,
  NotFoundError,
  InternalServerError,
  UnauthorizedError,
  ForbiddenError,
} = require("../utils/errors");

const getClothingItems = (req, res, next) =>
  ClothingItem.find({})
    .then((items) => res.status(200).json(items))
    .catch(() => next(new InternalServerError()));

const createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  if (!req.user || !req.user._id) {
    return next(new UnauthorizedError("User not authenticated"));
  }

  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
  })
    .then((item) => res.status(201).json(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid clothing item data"));
      }
      return next(new InternalServerError());
    });
};

const deleteClothingItemById = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .orFail(() => new NotFoundError("Clothing item not found"))
    .then((item) => {
      if (item.owner.toString() !== userId) {
        throw new ForbiddenError(
          "You do not have permission to delete this item"
        );
      }

      return ClothingItem.findByIdAndDelete(itemId).then(() =>
        res.status(200).json({ message: "Item deleted successfully" })
      );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID format"));
      }
      if (err.statusCode) {
        return next(err);
      }
      return next(new InternalServerError());
    });
};

const likeItem = (req, res, next) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        throw new NotFoundError("Item not found");
      }
      res.status(200).json(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID format"));
      }
      if (err.statusCode) {
        return next(err);
      }
      return next(new InternalServerError("Error liking item"));
    });

const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        throw new NotFoundError("Item not found");
      }
      res.status(200).json(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID format"));
      }
      if (err.statusCode) {
        return next(err);
      }
      return next(new InternalServerError("Error disliking item"));
    });
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItemById,
  likeItem,
  dislikeItem,
};
