const express = require("express");
const router = express.Router();
const CartController = require("./cart.controller");

router
  .route("/")
  .get(CartController.getAllCarts)
  .post(CartController.createCart);

router.get("/:id", CartController.getCartById);
router.get("/user/:id", CartController.getCartByUserId);

module.exports = router;
