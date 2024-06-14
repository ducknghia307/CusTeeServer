const { CREATED, OK } = require("../../core/success.response");
const OrderService = require("./order.service");
const asyncHandler = require("../../utils/asynchandler");

class OrderController {
  createOrder = asyncHandler(async (req, res) => {
    const newOrder = await OrderService.createOrder(req.body);
    new CREATED({
      message: "Order created successfully",
      metadata: newOrder,
    }).send(res);
  });

  getAllOrders = asyncHandler(async (req, res) => {
    const orders = await OrderService.getAllOrders();
    new OK({
      message: "Got all orders",
      metadata: orders,
    }).send(res);
  });

  getOrderById = asyncHandler(async (req, res) => {
    console.log(req.params.id);
    const order = await OrderService.getOrderById(req.params.id);
    new OK({
      message: "Get order by ID successfully!",
      metadata: order,
    }).send(res);
  });

  getOrdersByUserId = asyncHandler(async (req, res) => {
    console.log(req.params.id);
    const order = await OrderService.getOrdersByUserId(req.params.id);
    new OK({
      message: "Get order by userId successfully!",
      metadata: order,
    }).send(res);
  });

  getOrderByCode = asyncHandler(async (req, res) => {
    const code = req.params.code;
    const order = await OrderService.getOrderByCode(code);
    new OK({
      message: "Get order by code successfully!",
      metadata: order,
    }).send(res);
  });

  updateOrderByCode = asyncHandler(async (req, res) => {
    const result = await OrderService.updateOrderByCode(
      req.params.code,
      req.body
    );
    new OK({
      message: "Update delivery information successfully!",
      metadata: result,
    }).send(res);
  });

  updateDeliveryInfo = asyncHandler(async (req, res) => {
    const result = await OrderService.updateDeliveryInfo(
      req.params.code,
      req.body
    );
    new OK({
      message: "Update delivery information successfully!",
      metadata: result,
    }).send(res);
  });

  updatePaymentMethod = asyncHandler(async (req, res) => {
    const result = await OrderService.updatePaymentMethod(
      req.params.code,
      req.body
    );
    new OK({
      message: "Update payment method successfully!",
      metadata: result,
    }).send(res);
  });

  setOrderPaidStatusToTrue = asyncHandler(async (req, res) => {
    const code = req.params.code;
    const result = await OrderService.setOrderPaidStatusToTrue(code);
    new OK({
      message: "Update order paid status successfully!",
      metadata: result,
    }).send(res);
  });

  updateOrderStatusByCode = asyncHandler(async (req, res) => {
    const result = await OrderService.updateOrderStatusByCode(
      req.params.code,
      req.body.status
    );
    new OK({
      message: "Update order status by code successfully!",
      metadata: result,
    }).send(res);
  });

  deleteOrderById = asyncHandler(async (req, res) => {
    const result = await OrderService.deleteOrderById(req.params.id);
    new OK({
      message: "Delete order by id successfully!",
      metadata: result,
    }).send(res);
  });
}

module.exports = new OrderController();
