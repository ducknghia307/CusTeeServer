const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  method: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    code: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    deliveryOptions: {
      type: deliverySchema,
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "delivering", "completed", "cancel"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
