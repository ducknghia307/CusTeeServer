const OrderItemModel = require("./orderItem.model");
class OrderItemService {
  static async createOrderItem(data) {
    try {
      const orderItem = await OrderItemModel.create({
        productId: data.productId,
        orderId: data.orderId,
        quantityPerSize: data.quantityPerSize,
        unitPrice: data.unitPrice,
      });
      return orderItem;
    } catch (err) {
      throw new Error("Failed to create orderItem");
    }
  }

  static async getAllOrderItems() {
    const orderItems = await OrderItemModel.find().populate([
      "productId",
      "orderId",
    ]);
    return orderItems;
  }

  static async getOrderItemById(orderItemId) {
    const orderItem = await OrderItemModel.findById(orderItemId);
    if (!orderItem) {
      throw new NotFoundError("orderItem not found");
    }
    return orderItem;
  }

  static async getOrderItemByOrderId(orderId) {
    const orderItem = await OrderItemModel.find({ orderId: orderId });
    if (!orderItem) {
      throw new NotFoundError("orderItem not found");
    }
    return orderItem;
  }
}

module.exports = OrderItemService;
