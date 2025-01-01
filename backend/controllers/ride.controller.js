const CreateRideSchema = require("../ZodSchema/zodRideSchema");
const getFare = require("../services/ride.services");
const RideServices = require("../services/ride.services");

module.exports.CreateRide = async (req, res) => {
  try {
    const result = CreateRideSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.errors,
      });
    }

    const { pickUp, destination, vehicleType } = req.body;

    const NewRide = await RideServices.CreateRide({
      user: req.user._id,
      pickUp,
      destination,
      vehicleType,
    });

    return res.status(201).json({
      success: true,
      message: "Ride created successfully",
      data: NewRide,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports.GetFare = async (req, res) => {
  const { pickUp, destination } = req.query;
  if (!pickUp || !destination) {
    return res.status(401).json({
      message: "All fields required!",
    });
  }

  const fares = await getFare(pickUp, destination);

  return res.status(201).json({
    fares,
  });
};
