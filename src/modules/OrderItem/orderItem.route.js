const express = require("express");
const router = express.Router();
const OrderItemController = require("./orderItem.controller");

router
  .route("/")
  .get(OrderItemController.getAllOrderItems)
  .post(OrderItemController.createOrderItem);

router.get("/order/:id", OrderItemController.getOrderItemByOrderId);
router.get("/:id", OrderItemController.getOrderItemById);

module.exports = router;