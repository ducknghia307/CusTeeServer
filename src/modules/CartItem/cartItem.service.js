const CartItemModel = require("./cartItem.model");
class CartItemService {
  static async createCartItem(data) {
    const sizes = ["S", "M", "L", "XL", "XXL", "XXXL"];
    const quantityPerSize = sizes.map((size) => {
      const sizeEntry = data.quantityPerSize.find((q) => q.size === size);
      return sizeEntry ? sizeEntry : { size, quantity: 0 };
    });

    console.log("QUANTITY PER SIZE: ", quantityPerSize);

    const foundCartItem = await CartItemModel.findOne({
      userId: data.userId,
      productId: data.productId,
    });
    if (!foundCartItem) {
      const newCartItem = await CartItemModel.create({
        userId: data.userId,
        productId: data.productId,
        quantityPerSize: quantityPerSize,
      });
      return newCartItem;
    } else {
      const newQuantityPerSize = this.mergeQuantityPerSize(
        foundCartItem.quantityPerSize,
        quantityPerSize
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
      "userId",
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

  static async getCartItemByUserId(userId) {
    const cartItems = await CartItemModel.find({ userId: userId }).populate([
      "productId",
      "userId",
    ]);
    if (!cartItems) {
      throw new NotFoundError("CartItem not found");
    }
    return cartItems;
  }

  static async getCartItemByUserIdAndProductId(userId, productId) {
    const cartItem = await CartItemModel.find({
      userId: userId,
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

  static async deleteCartItem(cartItemId) {
    const cartItems = await CartItemModel.findByIdAndDelete(cartItemId);
    if (!cartItems) {
      throw new NotFoundError("CartItem not found");
    }
    return cartItems;
  }
}

module.exports = CartItemService;
