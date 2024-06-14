const { deleteOrderById } = require("./order.controller");
const OrderModel = require("./order.model");

class OrderService {
  static async createOrder(data) {
    try {
      const order = await OrderModel.create({
        userId: data.userId,
        code: data.code,
        total: data.total,
        paymentMethod: data.paymentMethod,
        deliveryInfo: data.deliveryInfo,
        deliveryOptions: data.deliveryOptions,
        discountValue: data.discountValue,
        status: data.status,
      });
      return order;
    } catch (err) {
      throw new Error("Failed to create order: " + err);
    }
  }

  static async getAllOrders() {
    const orders = await OrderModel.find().populate("userId");
    return orders;
  }

  static async getOrderById(orderId) {
    const order = await OrderModel.findById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  }

  static async getOrdersByUserId(userId) {
    const order = await OrderModel.find({ userId: userId })
      .populate("userId")
      .sort({
        createdAt: -1,
      });
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  }

  static async getOrderByCode(code) {
    const order = await OrderModel.findOne({ code: code }).populate("userId");
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  }

  static async updateOrderByCode(code, updatedInfo) {
    const result = await OrderModel.findOneAndUpdate(
      {
        code: code,
      },
      updatedInfo
    );
    return result;
  }

  static async updateDeliveryInfo(code, updatedInfo) {
    const result = await OrderModel.findOneAndUpdate(
      {
        code: code,
      },
      {
        deliveryInfo: updatedInfo,
      }
    );
    return result;
  }

  static async updatePaymentMethod(code, updatedInfo) {
    const result = await OrderModel.findOneAndUpdate(
      {
        code: code,
      },
      {
        paymentMethod: updatedInfo,
      }
    );
    return result;
  }

  static async setOrderPaidStatusToTrue(code) {
    const result = await OrderModel.findOneAndUpdate(
      {
        code: code,
      },
      {
        isPaid: true,
      }
    );
    return result;
  }

  static async updateOrderStatusByCode(code, status) {
    const result = await OrderModel.findOneAndUpdate(
      {
        code: code,
      },
      {
        status: status,
      }
    );
    return result;
  }

  static async deleteOrderById(orderId) {
    const order = await OrderModel.findByIdAndDelete(orderId);
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  }
}

module.exports = OrderService;
