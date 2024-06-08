const mongoose = require("mongoose");

const quantitySchema = new mongoose.Schema({
  size: {
    type: String,
    enum: ["S", "M", "L", "XL", "XXL"],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const cartItemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Product",
    },
    quantityPerSize: {
      type: [quantitySchema],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CartItem", cartItemSchema);
