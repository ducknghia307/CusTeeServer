const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");
const loginLimiter = require('../../middlewares/loginLimit')

router
  .route("/")
  .post(loginLimiter,authController.login);

router.route('/refresh').get(authController.refresh);

router.route('/logout').post(authController.logout);

module.exports = router;
