const OrderModel = require("./order.model");
class OrderService {
  static async createOrder(data) {
    try {
      const order = await OrderModel.create({
        userId: data.userId,
        code: data.code,
        paymentMethod: data.paymentMethod,
        deliveryOptions: data.deliveryOptions,
        discountValue: data.discountValue,
        status: data.status,
      });
      return order;
    } catch (err) {
      throw new Error("Failed to create order");
    }
  }

  static async getAllOrders() {
    const orders = await OrderModel.find().populate("userId");
    return orders;
  }

  static async getOrderById(orderId) {
    const order = await OrderModel.findById(orderId);
    if (!order) {
      throw new NotFoundError("Order not found");
    }
    return order;
  }

  static async getOrderByUserId(userId) {
    const order = await OrderModel.find({ userId: userId });
    if (!order) {
      throw new NotFoundError("Order not found");
    }
    return order;
  }

  static async getOrderByCode(code) {
    const order = await OrderModel.findOne({ code: code });
    if (!order) {
      throw new NotFoundError("Order not found");
    }
    return order;
  }
}

module.exports = OrderService;
