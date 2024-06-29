const mongoose = require('mongoose');

const imageMappingSchema = new mongoose.Schema({
  front: {
    type: String,
    required: true,
  },
  back: {
    type: String,
    required: true,
  },
});

const shirtSampleSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['tshirt', 'polo'], // Add more types as needed
  },
  color: {
    type: String,
    required: true,
    enum: ['Black', 'White', 'Beige'], // Add more colors as needed
  },
  images: imageMappingSchema,
});

const ShirtSample = mongoose.model('ShirtSample', shirtSampleSchema);

module.exports = ShirtSample;
