const express = require("express");
const router = express.Router();
const cartItemController = require("./cartItem.controller");

router
  .route("/")
  .get(cartItemController.getAllCartItems)
  .post(cartItemController.createCartItem);

router.get("/:id", cartItemController.getCartItemById);

router.get("/cart/:id", cartItemController.getCartItemByCartId);

router.patch("/:id", cartItemController.updateQuantity);

router.delete("/:id", cartItemController.deleteCartItem);

module.exports = router;
