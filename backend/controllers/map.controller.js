const  mapservice  = require("../services/maps.service");

module.exports.getCoordinates = async (req, res) => {
    const { address } = req.query;    
  try {
    const coordinates = await mapservice.getAddressCoordinate(address);
    return res.status(200).json(coordinates);
  } catch (error) {
    res.status(500).json({
      message: "internal server issues",
    });
  }
};


module.exports.getDistanceTime = async (req, res) => {
    const { origin,destination } = req.query;    
    
  try {
    const DistanceTime = await mapservice.getDistanceTime(origin,destination);
    return res.status(200).json(DistanceTime);
  } catch (error) {
    res.status(500).json({
      message: "internal server issues",
    });
  }
};

module.exports.getAutoCompeteSuggestions = async (req, res) => {
    const { input} = req.query;    
    if (!input ) {
        throw new Error("input required");
    }
    
  try {
    
    const Suggestions = await mapservice.getAutoCompeteSuggestions(input);
    return res.status(200).json(Suggestions);
  } catch (error) {
    res.status(500).json({
      message: "internal server issues",
    });
  }
};



