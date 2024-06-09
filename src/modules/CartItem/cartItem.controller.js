const { CREATED, OK } = require("../../core/success.response");
const CartItemService = require("./cartItem.service");
const asyncHandler = require("../../utils/asynchandler");

class CartItemController {
  createCartItem = asyncHandler(async (req, res) => {
    const cartItem = await CartItemService.createCartItem(req.body);
    new CREATED({
      message: "CartItem created successfully!",
      metadata: cartItem,
    }).send(res);
  });

  getAllCartItems = asyncHandler(async (req, res) => {
    const cartItems = await CartItemService.getAllCartItems();
    new OK({
      message: "Got all cartItems",
      metadata: cartItems,
    }).send(res);
  });

  getCartItemById = asyncHandler(async (req, res) => {
    const cartItem = await CartItemService.getCartItemById(req.params.id);
    new OK({
      message: "Get cartItem by ID successfully!",
      metadata: cartItem,
    }).send(res);
  });

  getCartItemByUserId = asyncHandler(async (req, res) => {
    const cartItem = await CartItemService.getCartItemByUserId(req.params.id);
    new OK({
      message: "Get cartItem by userID successfully!",
      metadata: cartItem,
    }).send(res);
  });

  updateQuantity = asyncHandler(async (req, res) => {
    const cartItem = await CartItemService.updateQuantity(
      req.params.id,
      req.body.size,
      req.body.quantity
    );
    new OK({
      message: "Update quantity successfully!",
      metadata: cartItem,
    }).send(res);
  });

  deleteCartItem = asyncHandler(async (req, res) => {
    const cartItem = await CartItemService.deleteCartItem(req.params.id);
    new OK({
      message: "Cart item has been deleted successfully!",
      metadata: cartItem,
    }).send(res);
  });
}

module.exports = new CartItemController();
