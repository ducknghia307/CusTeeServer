const express = require("express");
const router = express.Router();
const orderItemController = require("./orderItem.controller");

router
  .route("/")
  .get(orderItemController.getAllOrderItems)
  .post(orderItemController.createOrderItem);

router.get("/order/:id", orderItemController.getOrderItemByOrderId);
router.get("/:id", orderItemController.getOrderItemById);

module.exports = router;
