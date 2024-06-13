const express = require("express");
const router = express.Router();
const productController = require("./product.controller");

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createProduct);

router.get("/:id", productController.getProductById);
router.patch("/:id", productController.updateProductById);

module.exports = router;
