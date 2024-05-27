const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
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
    role: {
      type: String,
      default: "user",
    },
    quantityId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Quantity",
    },
    color: {
      type: String,
      default: "white",
      required: true,
    },
    pattern: {
      type: String,
      default: "T-shirt",
      required: true,
    },
    discount: {
      type: String,
    },
    image: {
      type: String,
      require: "true",
    },
    wordDecoration: {
      type: String,
    },
    imageDecoration: {},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
