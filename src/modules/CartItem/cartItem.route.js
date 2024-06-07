const express = require("express");
const router = express.Router();
const CartItemController = require("./cartItem.controller");

router
  .route("/")
  .get(CartItemController.getAllCartItems)
  .post(CartItemController.createCartItem);

router.get("/:id", CartItemController.getCartItemById);

router.get("/user/:id", CartItemController.getCartItemByUserId);

router.patch("/:id", CartItemController.updateQuantity);

router.delete("/:id", CartItemController.deleteCartItem);

module.exports = router;
