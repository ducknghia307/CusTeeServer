const { CREATED, OK } = require("../../core/success.response");
const asyncHandler = require("../../utils/asynchandler");

class AddressController {
  getProvinces = asyncHandler(async (req, res) => {
    await fetch("https://vapi.vnappmob.com/api/province")
      .then((res) => res.json())
      .then((data) => {
        new OK({
          metadata: data.results,
        }).send(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  getDistricts = asyncHandler(async (req, res) => {
    const provinceId = req.params.province_id;
    await fetch(`https://vapi.vnappmob.com/api/province/district/${provinceId}`)
      .then((res) => res.json())
      .then((data) => {
        new OK({
          metadata: data.results,
        }).send(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  getWards = asyncHandler(async (req, res) => {
    const districtId = req.params.district_id;
    await fetch(`https://vapi.vnappmob.com/api/province/ward/${districtId}`)
      .then((res) => res.json())
      .then((data) => {
        new OK({
          metadata: data.results,
        }).send(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

module.exports = new AddressController();
