const express = require("express");
const router = express.Router();
const PayOSController = require('./payos.controller')

router.post('/createPaymentLink', PayOSController.createPaymentLink)

router.get('/getPaymentLinkInformation', PayOSController.getPaymentLinkInformation)

module.exports = router;