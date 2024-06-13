const { CREATED, OK } = require("../../core/success.response");
const ProductService = require("./product.service");
const asyncHandler = require("../../utils/asynchandler");

class ProductController {
  createProduct = asyncHandler(async (req, res) => {
    const product = await ProductService.createProduct(req.body);
    new CREATED({
      message: "Product created successfully!",
      metadata: product,
    }).send(res);
  });

  getAllProducts = asyncHandler(async (req, res) => {
    const products = await ProductService.getAllProducts();
    new OK({
      message: "Got all products",
      metadata: products,
    }).send(res);
  });

  getProductById = asyncHandler(async (req, res) => {
    console.log(req.params.id);
    const product = await ProductService.getProductById(req.params.id);
    new OK({
      message: "Get product by ID successfully!",
      metadata: product,
    }).send(res);
  });

  updateProductById = asyncHandler(async (req, res) => {
    const product = await ProductService.updateProductById(req.params.id, req.body);
    new OK({
      message: "Update product by ID successfully!",
      metadata: product,
    }).send(res);
  });
}

module.exports = new ProductController();
