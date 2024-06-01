const express = require("express");
const router = express.Router();
const otpController = require("./otp.controller");

router.route("/requestOTP").post(otpController.requestOTP);

router.route("/verifyOTP").post(otpController.verifyOTP);

router.route("/resetPassword").post(otpController.resetPassword);

module.exports = router;
