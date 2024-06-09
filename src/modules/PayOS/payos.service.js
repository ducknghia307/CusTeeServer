const PayOS = require("@payos/node");
const payOS = new PayOS(process.env.PAYOS_CLIENT_ID, process.env.PAYOS_API_KEY, process.env.PAYOS_CHECKSUM_KEY)
const crypto = require('crypto')

class PayOSService {
    static async createPaymentLink(data) {
        // const checkSumKey = process.env.PAYOS_CHECKSUM_KEY
        const checkoutRequestData = {
            orderCode: data.orderCode,
            amount: data.amount,
            description: data.description,
            cancelUrl: 'http://localhost:3000/cart',
            returnUrl: 'http://localhost:3000/checkout/completed',
            items: data.items,
            buyerName: data.buyerName,
            buyerPhone: data.buyerPhone,
            expriredAt: data.expriredAt
        }
        const paymentLinkRes = await payOS.createPaymentLink(checkoutRequestData)
        console.log("STATUS: ", paymentLinkRes.checkoutUrl);
        return paymentLinkRes.checkoutUrl

    }

    static async getPaymentLinkInformation(orderId) {
        const paymentLink = await payOS.getPaymentLinkInformation(orderId)
        console.log("paymentLink: ", paymentLink);
        return paymentLink

    }
}

module.exports = PayOSService