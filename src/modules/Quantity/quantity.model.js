const mongoose = require("mongoose");

const quantitySchema = new mongoose.Schema({

  quantity: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    enum: ['S', 'M', 'L', 'XL', 'XXL'],
    required: true,
  },
 

}, { timestamps: true });

module.exports = mongoose.model("Quantity", quantitySchema);
