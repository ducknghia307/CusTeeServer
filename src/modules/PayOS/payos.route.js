const express = require("express");
const router = express.Router();
const PayOSController = require("./payos.controller");

router.post("/createPaymentLink", PayOSController.createPaymentLink);

router.get(
  "/getPaymentLinkInformation/:id",
  PayOSController.getPaymentLinkInformation
);

router.get("/cancelPaymentLink/:id", PayOSController.cancelPaymentLink);

module.exports = router;
