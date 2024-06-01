const ProductModel = require("./product.model");
class ProductService {
  static async createProduct(data) {
    try {
      const product = await ProductModel.create({
        userId: data.userId,
        name: data.name,
        price: data.price,
        color: data.color,
        pattern: data.pattern,
        image: data.image,
        wordDecoration: data.wordDecoration,
        imageDecoration: data.imageDecoration,
      });
      return product;
    } catch (err) {
      throw new Error("Failed to create product");
    }
  }

  static async getAllProducts() {
    const products = await ProductModel.find().populate("userId");
    return products;
  }

  static async getProductById(productId) {
    const product = await ProductModel.findById(productId);
    if (!product) {
      throw new NotFoundError("Product not found");
    }
    return product;
  }
}

module.exports = ProductService;
