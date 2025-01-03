const axios = require("axios");
const CaptainModel =require("../models/captain.model")

module.exports.getAddressCoordinate = async (address) => {
  const apikey = process.env.MAP;
  const url = `https://maps.gomaps.pro/maps/api/geocode/json?key=${apikey}&address=${address}`;

  try {
    const response = await axios.get(url);

    if (response.data.status == "OK") {
      const location = response.data.results[0].geometry.location;

      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error("unable to fetch coordinates");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  console.log(origin, destination);
  if (!origin || !destination) {
    throw new Error("Origin and distance Required");
  }

  const apikey = process.env.MAP;
  const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?destinations=${destination}&origins=${origin}&key=${apikey}`;

  try {
    const response = await axios.get(url);

    if (response.data.status == "OK") {
      if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
        throw new Error("routes not found");
      }

      return response.data.rows[0].elements[0];
    } else {
      throw new Error("unable to fetch data");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports.getAutoCompeteSuggestions = async (input) => {
  if (!input) {
    throw new Error("Origin and distance Required");
  }

  const apikey = process.env.MAP;
  const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${input}&key=${apikey}`;

  try {
    const response = await axios.get(url);

    if (response.data.status == "OK") {
      return response.data.predictions;
    } else {
      throw new Error("unable to fetch data");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};


module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

  const captains = await CaptainModel.find({
      location: {
          $geoWithin: {
              $centerSphere: [ [ ltd, lng ], radius / 6371 ]
          }
      }
  });

  return captains;


}