const ProductModel = require("./product.model");
class ProductService {
  static async createProduct(data) {
    console.log(":::::::;", data)
    try {
      const product = await ProductModel.create({
        userId: data.userId,
        name: data.name,
        price: data.price,
        pattern: data.pattern,
        images: {
          front: data.images.front,
          back: data.images.back
        }
      });
      return product;
    } catch (err) {
      console.log(err);
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

  static async updateProductById(productId, updatedProductData) {
    const product = await ProductModel.findByIdAndUpdate(productId, updatedProductData, {
      new: true,
    });
    if (!product) {
      throw new NotFoundError("Product not found");
    }
    return product;
  }
}

module.exports = ProductService;
