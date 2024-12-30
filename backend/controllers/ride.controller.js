const CreateRideSchema = require("../ZodSchema/zodRideSchema");
const RideServices = require("../services/ride.services");

module.exports.CreateRide = async (req, res) => {
  try {
    console.log(req.body);

    const result = CreateRideSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.errors,
      });
    }


    const { pickUp, destination,vehicleType } = req.body;

    const NewRide = await RideServices.CreateRide({
      user: req.user._id,
      pickUp,
      destination,
      vehicleType,
    });

    return res.status(200).json({
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
