const mongoose = require("mongoose");

const deliveryOptionsSchema = new mongoose.Schema({
  method: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
});

const deliveryInfoSchema = new mongoose.Schema({
  recipientName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    minLength: 9,
    maxLength: 11,
  },
  address: {
    type: String,
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
      unique: true,
      required: true,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentLink: {
      type: String,
      required: false,
    },
    deliveryInfo: {
      type: deliveryInfoSchema,
      required: true,
    },
    deliveryOptions: {
      type: deliveryOptionsSchema,
      required: true,
    },
    deliveryStatus: {
      type: Boolean,
      required: false,
    },
    discountValue: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "delivering", "completed", "cancelled"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
