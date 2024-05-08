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
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router;
