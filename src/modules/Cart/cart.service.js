const CartModel = require("./cart.model");
class CartService {
  static async createCart(data) {
    // const findCart = await CartModel.find({ userId: data.userId });
    // if (findCart) throw new Error("User already had a cart");
    const cart = await CartModel.create({
      userId: data.userId,
    });
    return cart;
  }

  static async getAllCarts() {
    const carts = await CartModel.find().populate("userId");
    return carts;
  }

  static async getCartById(cartId) {
    const cart = await CartModel.findById(cartId);
    if (!cart) {
      throw new NotFoundError("Cart not found");
    }
    return cart;
  }

  static async getCartByUserId(userId) {
    const cart = await CartModel.findOne({ userId: userId });
    if (!cart) {
      throw new Error("Cart not found");
    }
    return cart;
  }
}

module.exports = CartService;
