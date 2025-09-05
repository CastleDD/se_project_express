const router = require("express").Router();
const { validateCreateItem, validateId } = require("../middlewares/validation");
const {
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.post("/", validateCreateItem, createItem);
router.delete("/:itemId", validateId, deleteItem);

router.put("/:itemId/likes", validateId, likeItem);
router.delete("/:itemId/likes", validateId, dislikeItem);

module.exports = router;
