const Item = require("../item");
const express = require("express");
const expressError = require("../expressError");
const router = express.Router();

/**GET / => [item, ...] */

router.get("", (req, res, next) => {
  try {
    return res.json({ items: Item.findItems() });
  } catch (err) {
    return next(err);
  }
});

/** POST / => new-item */

router.post("", (req, res, next) => {
  try {
    let newItem = new Item(req.body.name, req.body.price);
    return res.json({ item: newItem });
  } catch (err) {
    return next(err);
  }
});

/** GET /[name] => item */

router.get("/:name", (req, res, next) => {
  try {
    let foundItem = Item.findItem(req.params.name);
    if (!foundItem) {
      throw new expressError("Item not found", 404);
    }
    return res.json({ item: foundItem });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[name] => item */

router.patch("/:name", (req, res, next) => {
  try {
    let foundItem = Item.update(req.params.name, req.body);
    return res.json({ item: foundItem });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[name] => item */

router.delete("/:name", (req, res, next) => {
  try {
    Item.delete(req.params.name);
    return res.json({ message: "Item deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
