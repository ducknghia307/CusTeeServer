const ShirtSampleModel = require('./shirtSample.model');

class ShirtSampleService {
  static async createShirtSample(shirtData) {
    try {
        console.log(shirtData);
      const shirtSample = await ShirtSampleModel.create(shirtData);
      return shirtSample;
    } catch (error) {
      throw new Error('Failed to create shirt sample');
    }
  }

  static async getAllShirtSamples() {
    const shirtSamples = await ShirtSampleModel.find();
    const totalShirtSamples = await ShirtSampleModel.countDocuments();
    return { shirtSamples, totalShirtSamples };
  }

  static async getShirtSampleById(shirtSampleId) {
    const shirtSample = await ShirtSampleModel.findById(shirtSampleId);
    if (!shirtSample) {
      throw new Error('Shirt sample not found');
    }
    return shirtSample;
  }

  static async updateShirtSampleById(shirtSampleId, updatedShirtData) {
    const shirtSample = await ShirtSampleModel.findByIdAndUpdate(
      shirtSampleId,
      updatedShirtData,
      { new: true }
    );
    if (!shirtSample) {
      throw new Error('Shirt sample not found');
    }
    return shirtSample;
  }

  static async deleteShirtSampleById(shirtSampleId) {
    const shirtSample = await ShirtSampleModel.findByIdAndDelete(shirtSampleId);
    if (!shirtSample) {
      throw new Error('Shirt sample not found');
    }
    return shirtSample;
  }

  static async getShirtSampleByTypeAndColor(type, color) {
    const shirtSample = await ShirtSampleModel.findOne({ type, color });
    if (!shirtSample) {
      throw new Error('Shirt sample not found');
    }
    return shirtSample;
  }
}

module.exports = ShirtSampleService;
