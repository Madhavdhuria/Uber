const CreateRideSchema = require("../ZodSchema/zodRideSchema");
const getFare = require("../services/ride.services");
const RideServices = require("../services/ride.services");
const Mapservices = require("../services/maps.service");
const { sendMessagetoSocketId } = require("../socket");
const RideModel = require("../models/ride.model");

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
    const pickUpCoordinates = await Mapservices.getAddressCoordinate(pickUp);

    const CaptainsinRadius = await Mapservices.getCaptainsInTheRadius(
      pickUpCoordinates.lat,
      pickUpCoordinates.lng,
      2000
    );
    NewRide.otp = "";

    const ridewithUser = await RideModel.findOne({ _id: NewRide._id }).populate(
      "user"
    );

    CaptainsinRadius.map((captain) => {
      sendMessagetoSocketId(captain.socketId, {
        event: "new-ride",
        data: ridewithUser,
      });
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

module.exports.RideAccept = async (req, res) => {
  try {
    const captain = req.captain;
    const { RideId, userId } = req.body;

    const Ride = await RideServices.UpdateRide(captain._id, RideId);

    sendMessagetoSocketId(userId, {
      event: "ride-accept",
      data: Ride,
    });

    return res.status(201).json({
      success: true,
      Ride,
    });
  } catch (error) {}
};

module.exports.StartRide = async (req, res) => {
  const { otp, RideId } = req.body;

  if (!otp) {
    res.status(203).json({
      message: "Otp required",
    });
  }

  const Ride = await RideServices.StartRide(otp, RideId);

  sendMessagetoSocketId(Ride.user.socketId, {
    event: "start-ride",
    data: Ride,
  });

  return res.status(201).json({
    Ride,
  });
};
