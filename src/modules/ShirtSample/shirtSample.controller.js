const { CREATED, OK } = require('../../core/success.response');
const ShirtSampleService = require('./shirtSample.service');
const asyncHandler = require('../../utils/asynchandler');

class ShirtSampleController {
  createShirtSample = asyncHandler(async (req, res) => {
    const shirtSample = await ShirtSampleService.createShirtSample(req.body);
    new CREATED({
      message: "Shirt sample created successfully!",
      metadata: shirtSample,
    }).send(res);
  });

  getAllShirtSamples = asyncHandler(async (req, res) => {
    const { shirtSamples, totalShirtSamples } = await ShirtSampleService.getAllShirtSamples();
    new OK({
      message: "Get all shirt samples successfully!",
      metadata: { shirtSamples, totalShirtSamples },
    }).send(res);
  });

  getShirtSampleById = asyncHandler(async (req, res) => {
    const shirtSample = await ShirtSampleService.getShirtSampleById(req.params.id);
    new OK({
      message: "Get shirt sample by ID successfully!",
      metadata: shirtSample,
    }).send(res);
  });

  updateShirtSampleById = asyncHandler(async (req, res) => {
    const shirtSample = await ShirtSampleService.updateShirtSampleById(req.params.id, req.body);
    new OK({
      message: "Update shirt sample by ID successfully!",
      metadata: shirtSample,
    }).send(res);
  });

  deleteShirtSampleById = asyncHandler(async (req, res) => {
    const shirtSample = await ShirtSampleService.deleteShirtSampleById(req.params.id);
    new OK({
      message: "Delete shirt sample by ID successfully!",
      metadata: shirtSample,
    }).send(res);
  });

  getShirtSampleByTypeAndColor = asyncHandler(async (req, res) => {
    const { type, color } = req.body;
    const shirtSample = await ShirtSampleService.getShirtSampleByTypeAndColor(type, color);
    new OK({
      message: "Get shirt sample by type and color successfully!",
      metadata: shirtSample,
    }).send(res);
  });
}

module.exports = new ShirtSampleController();
