const express = require("express");
const router = express.Router();
const usersController = require("./user.controller");
const verifyJWT = require("../../middlewares/verifyJWT");

router.use(verifyJWT);

router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.createUser);

router.post("/change_password", usersController.changePassword);
router.patch("/:id", usersController.updateUserById);
router.delete("/:id", usersController.deleteUserById);

module.exports = router;
