const express = require("express");
const router = express.Router();

// test app api
router.get("/checkstatus", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "api ok",
  });
});

router.use("/otp", require("./modules/Otp/otp.route"));
router.use("/auth", require("./modules/Auth/auth.route"));
router.use("/api/user", require("./modules/User/user.route"));
router.use("/api/product", require("./modules/Product/product.route"));
router.use("/api/cart", require("./modules/Cart/cart.route"));
router.use("/api/cartItem", require("./modules/CartItem/cartItem.route"));
router.use("/api/order", require("./modules/Order/order.route"));
router.use("/api/orderItem", require("./modules/OrderItem/orderItem.route"));

module.exports = router;
