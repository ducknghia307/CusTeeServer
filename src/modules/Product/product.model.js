const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    pattern: {
      type: String,
      default: "T-shirt",
      required: true,
    },
    images: {
      front: { type: String, required: true },
      back: { type: String, required: true }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
