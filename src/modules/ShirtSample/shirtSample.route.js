const express = require("express");
const router = express.Router();
const shirtSampleController = require("./shirtSample.controller");

router
  .route("/")
  .get(shirtSampleController.getAllShirtSamples)
  .post(shirtSampleController.createShirtSample);

router.get("/search",shirtSampleController.getShirtSampleByTypeAndColor)



module.exports = router;
