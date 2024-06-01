const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
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
