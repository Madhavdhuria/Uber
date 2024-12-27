const CaptainModel = require("../models/captain.model");

const createCaptain = async (data) => {

  const newCaptain = await CaptainModel.create(data);

  return newCaptain;
};

module.exports = createCaptain;
