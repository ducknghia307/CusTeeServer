const CartItemModel = require("./cartItem.model");
class CartItemService {
  static async createCartItem(data) {
    if (
      data.quantityPerSize.length != 5 ||
      data.quantityPerSize[0].size !== "S" ||
      data.quantityPerSize[1].size !== "M" ||
      data.quantityPerSize[2].size !== "L" ||
      data.quantityPerSize[3].size !== "XL" ||
      data.quantityPerSize[4].size !== "XXL"
    )
      throw new Error("Invalid quantityPerSize");

    const foundCartItem = await CartItemModel.findOne({
      cartId: data.cartId,
      productId: data.productId,
    });
    if (!foundCartItem) {
      const newCartItem = await CartItemModel.create({
        cartId: data.cartId,
        productId: data.productId,
        quantityPerSize: data.quantityPerSize,
      });
      return newCartItem;
    } else {
      const newQuantityPerSize = this.mergeQuantityPerSize(
        foundCartItem.quantityPerSize,
        data.quantityPerSize
      );
      const updatedCartItem = await CartItemModel.findByIdAndUpdate(
        foundCartItem._id,
        {
          quantityPerSize: newQuantityPerSize,
        }
      );
      return updatedCartItem;
    }
  }

  static async getAllCartItems() {
    const cartItems = await CartItemModel.find().populate([
      "cartId",
      "productId",
    ]);
    return cartItems;
  }

  static async getCartItemById(cartItemId) {
    const cartItem = await CartItemModel.findById(cartItemId).populate(
      "productId"
    );
    if (!cartItem) {
      throw new NotFoundError("CartItem not found");
    }
    return cartItem;
  }

  static async getCartItemByCartId(cartId) {
    const cartItems = await CartItemModel.find({ cartId: cartId }).populate(
      "productId"
    );
    if (!cartItems) {
      throw new NotFoundError("CartItem not found");
    }
    return cartItems;
  }

  static async getCartItemByCartIdAndProductId(cartId, productId) {
    const cartItem = await CartItemModel.find({
      cartId: cartId,
      productId: productId,
    });
    if (!cartItem) {
      throw new NotFoundError("CartItem not found");
    }
    return cartItem;
  }

  static mergeQuantityPerSize(first, second) {
    first.map((f) => {
      second.map((s) => {
        if (f.size === s.size) {
          f.quantity = f.quantity + s.quantity;
        } else {
          const find = first.find((i) => i.size == s.size);
          if (!find) first.push({ size: s.size, quantity: s.quantity });
        }
      });
    });
    return first;
  }

  static async updateQuantity(cartItemId, size, quantity) {
    const updatedCartItem = await CartItemModel.updateOne(
      {
        _id: cartItemId,
      },
      {
        $set: {
          "quantityPerSize.$[item].quantity": quantity,
        },
      },
      {
        arrayFilters: [
          {
            "item.size": {
              $eq: size,
            },
          },
        ],
        upsert: true,
      }
    );

    if (!updatedCartItem) {
      throw new NotFoundError("CartItem not found");
    }
    return updatedCartItem;
  }

  static async deleteCartItem(cartId) {
    const cartItems = await CartItemModel.findByIdAndDelete(cartId);
    if (!cartItems) {
      throw new NotFoundError("CartItem not found");
    }
    return cartItems;
  }
}

module.exports = CartItemService;
