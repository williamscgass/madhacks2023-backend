const nodeGeocoder = require("node-geocoder");
const options = {
  provider: "openstreetmap",
};
const geoCoder = nodeGeocoder(options);

module.exports = async function (req) {
  try {
    let location = await geoCoder.geocode(req.body.address);
    location = location[0];
    if (!location) {
      return {
        address: null,
        lat: null,
        lon: null,
      };
    }
    return {
      address: location.formattedAddress,
      lat: location.latitude,
      lon: location.longitude,
    };
  } catch (err) {
    return {
      address: location.formattedAddress,
      lat: location.latitude,
      lon: location.longitude,
    };
  }
};
