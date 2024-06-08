const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");
const loginLimiter = require('../../middlewares/loginLimit')

router
  .route("/")
  .post(loginLimiter,authController.login);

router.route('/refresh').get(authController.refresh);

router.route('/logout').post(authController.logout);

router.route('/register').post(authController.register);

router.route('/google_login').post(authController.loginWithGoogle);

module.exports = router;
