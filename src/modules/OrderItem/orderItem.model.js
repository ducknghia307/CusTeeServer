const mongoose = require("mongoose");

const quantitySchema = new mongoose.Schema({
  size: {
    type: String,
    enum: ["S", "M", "L", "XL", "XXL", "XXXL"],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Product",
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Order",
    },
    quantityPerSize: {
      type: [quantitySchema],
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrderItem", orderItemSchema);
