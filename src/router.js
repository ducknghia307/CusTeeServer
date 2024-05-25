const express = require("express");
const router = express.Router();

// test app api
router.get("/checkstatus", (req, res, next) => {
    res.status(200).json({
        status: "success",
        message: "api ok",
    });
});
router.use("/api/user", require("./modules/User/user.route"));
router.use("/auth", require("./modules/Auth/auth.route"));

module.exports = router;
