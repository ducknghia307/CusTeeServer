const asyncHandler = require("../../utils/asynchandler");
const { CREATED, OK } = require("../../core/success.response");
const PayOSService = require('./payos.service')

class PayOSController {
    createPaymentLink = asyncHandler(async (req, res) => {
        try {
            const result = await PayOSService.createPaymentLink(req.body); // Await the promise here
            console.log("::::::::::::",result);
            new CREATED({
                message: "Payment link created",
                metadata: { checkoutUrl: result }, // Ensure the result is included in metadata
            }).send(res);
        } catch (error) {
            console.error("Error in createPaymentLink handler: ", error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
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