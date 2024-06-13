const express = require("express");
const router = express.Router();
const orderController = require("./order.controller");

router
  .route("/")
  .get(orderController.getAllOrders)
  .post(orderController.createOrder);

router.get("/code/:code", orderController.getOrderByCode);
router.get("/user/:id", orderController.getOrderByUserId);
router.get("/:id", orderController.getOrderById);
router.put("/:id", orderController.updateOrderStatus);

module.exports = router;
