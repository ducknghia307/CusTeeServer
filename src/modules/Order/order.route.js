const express = require("express");
const router = express.Router();
const OrderController = require("./order.controller");

router
  .route("/")
  .get(OrderController.getAllOrders)
  .post(OrderController.createOrder);

router.get("/code/:code", OrderController.getOrderByCode);
router.get("/user/:id", OrderController.getOrdersByUserId);
router.get("/:id", OrderController.getOrderById);

router.patch("/deliveryInfo/:code", OrderController.updateDeliveryInfo);
router.patch("/paidStatus/:code", OrderController.setOrderPaidStatusToTrue);
router.patch("/status/:code", OrderController.updateOrderStatusByCode);
router.patch("/:code", OrderController.updateOrderByCode);

router.delete("/:id", OrderController.deleteOrderById);

module.exports = router;
