const crypto = require("crypto");
const PayOS = require("@payos/node");
const payOS = new PayOS(
  process.env.PAYOS_CLIENT_ID,
  process.env.PAYOS_API_KEY,
  process.env.PAYOS_CHECKSUM_KEY
);
const checkSumKey = process.env.PAYOS_CHECKSUM_KEY;

function sortObjDataByKey(object) {
  const orderedObject = Object.keys(object)
    .sort()
    .reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {});
  return orderedObject;
}

function convertObjToQueryStr(object) {
  return Object.keys(object)
    .filter((key) => object[key] !== undefined)
    .map((key) => {
      let value = object[key];
      // Sort nested object
      if (value && Array.isArray(value)) {
        value = JSON.stringify(value.map((val) => sortObjDataByKey(val)));
      }
      // Set empty string if null
      if ([null, undefined, "undefined", "null"].includes(value)) {
        value = "";
      }

      return `${key}=${value}`;
    })
    .join("&");
}

function isValidData(data, currentSignature, checksumKey) {
  const sortedDataByKey = sortObjDataByKey(data);
  const dataQueryStr = convertObjToQueryStr(sortedDataByKey);
  const dataToSignature = crypto
    .createHmac("sha256", checksumKey)
    .update(dataQueryStr)
    .digest("hex");
  return dataToSignature == currentSignature;
}

class PayOSService {
  static async createPaymentLink(data) {
    //SIGNATURE HASHING
    const dataObject = {
      orderCode: data.orderCode,
      amount: data.amount,
      description: data.description,
      cancelUrl: data.cancelUrl,
      returnUrl: data.returnUrl,
      items: data.items,
      buyerName: data.buyerName,
      buyerPhone: data.buyerPhone,
      expriredAt: data.expriredAt,
    };
    const sortedData = sortObjDataByKey(dataObject);
    const dataQueryStr = convertObjToQueryStr(sortedData);
    const dataToSignature = crypto
      .createHmac("sha256", checkSumKey)
      .update(dataQueryStr)
      .digest("hex");

    if (isValidData(dataObject, dataToSignature, checkSumKey)) {
      console.log("Signature: ", dataToSignature);
      const checkoutRequestData = {
        orderCode: data.orderCode,
        amount: data.amount,
        description: data.description,
        cancelUrl: data.cancelUrl,
        returnUrl: data.returnUrl,
        items: data.items,
        buyerName: data.buyerName,
        buyerPhone: data.buyerPhone,
        expriredAt: data.expriredAt,
        signature: dataToSignature,
      };

      const paymentLinkRes = await payOS.createPaymentLink(checkoutRequestData);
      console.log("STATUS: ", paymentLinkRes);
      return paymentLinkRes;
    }
  }

  static async getPaymentLinkInformation(orderId) {
    const paymentLink = await payOS.getPaymentLinkInformation(orderId);
    return paymentLink;
  }

  static async cancelPaymentLink(orderId) {
    const result = await payOS.cancelPaymentLink(orderId);
    return result;
  }
}

module.exports = PayOSService;
