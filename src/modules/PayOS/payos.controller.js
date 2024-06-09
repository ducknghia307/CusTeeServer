const asyncHandler = require("../../utils/asynchandler");
const { CREATED, OK } = require("../../core/success.response");
const PayOSService = require('./payos.service')

class PayOSController {
    createPaymentLink = asyncHandler(async (req, res) => {
        const result = PayOSService.createPaymentLink(req.body)
        new CREATED({
            message: "Payment link created",
            metadata: result,
        }).send(res);
    });

    getPaymentLinkInformation = asyncHandler(async (req, res) => {
        const result = PayOSService.getPaymentLinkInformation(req.body.orderId)
        new CREATED({
            message: "Got payment link information",
            metadata: result,
        }).send(res);
    });
}

module.exports = new PayOSController()