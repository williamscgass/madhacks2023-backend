const nodeGeocoder = require("node-geocoder");
const options = {
  provider: "openstreetmap",
};
const geoCoder = nodeGeocoder(options);

module.exports = async function (address) {
  let location = await geoCoder.geocode(req.body.address);
  location = location[0];
  return {
    address: location.formattedAddress,
    lat: location.latitude,
    lon: location.longitude,
  };
};
