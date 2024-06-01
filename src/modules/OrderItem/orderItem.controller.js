const { CREATED, OK } = require("../../core/success.response");
const OrderItemService = require("./orderItem.service");
const asyncHandler = require("../../utils/asynchandler");

class OrderItemController {
  createOrderItem = asyncHandler(async (req, res) => {
    const newOrderItem = await OrderItemService.createOrderItem(req.body);
    new CREATED({
      message: "orderItem created successfully",
      metadata: newOrderItem,
    }).send(res);
  });

  getAllOrderItems = asyncHandler(async (req, res) => {
    const orderItems = await OrderItemService.getAllOrderItems();
    new OK({
      message: "Got all orderItems",
      metadata: orderItems,
    }).send(res);
  });

  getOrderItemById = asyncHandler(async (req, res) => {
    console.log(req.params.id);
    const orderItem = await OrderItemService.getOrderItemById(req.params.id);
    new OK({
      message: "Get orderItem by ID successfully!",
      metadata: orderItem,
    }).send(res);
  });

  getOrderItemByOrderId = asyncHandler(async (req, res) => {
    console.log(req.params.id);
    const orderItem = await OrderItemService.getOrderItemByOrderId(
      req.params.id
    );
    new OK({
      message: "Get orderItem by orderId successfully!",
      metadata: orderItem,
    }).send(res);
  });
}

module.exports = new OrderItemController();
