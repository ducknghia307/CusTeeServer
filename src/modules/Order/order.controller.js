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

  getOrderByUserId = asyncHandler(async (req, res) => {
    console.log(req.params.id);
    const order = await OrderService.getOrderByUserId(req.params.id);
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
}

module.exports = new OrderController();
