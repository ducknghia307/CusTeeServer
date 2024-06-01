const { CREATED, OK } = require("../../core/success.response");
const cartService = require("./cart.service");
const asyncHandler = require("../../utils/asynchandler");

class CartController {
  createCart = asyncHandler(async (req, res) => {
    const cart = await cartService.createCart(req.body);
    new CREATED({
      message: "Cart created successfully!",
      metadata: cart,
    }).send(res);
  });

  getAllCarts = asyncHandler(async (req, res) => {
    const carts = await cartService.getAllCarts();
    new OK({
      message: "Got all carts",
      metadata: carts,
    }).send(res);
  });

  getCartById = asyncHandler(async (req, res) => {
    console.log(req.params.id);
    const cart = await cartService.getCartById(req.params.id);
    new OK({
      message: "Get cart by ID successfully!",
      metadata: cart,
    }).send(res);
  });

  getCartByUserId = asyncHandler(async (req, res) => {
    console.log(req.params.id);
    const cart = await cartService.getCartByUserId(req.params.id);
    new OK({
      message: "Get cart by userId successfully!",
      metadata: cart,
    }).send(res);
  });
}

module.exports = new CartController();
