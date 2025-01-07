const { getDistanceTime } = require("./maps.service");
const RideModel = require("../models/ride.model");
const { sendMessagetoSocketId } = require("../socket");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await getDistanceTime(pickup, destination);

  const baseFare = {
    auto: 30,
    car: 50,
    moto: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    moto: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    moto: 1.5,
  };

  const fare = {
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distance.value / 1000) * perKmRate.auto +
        (distanceTime.duration.value / 60) * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
        (distanceTime.distance.value / 1000) * perKmRate.car +
        (distanceTime.duration.value / 60) * perMinuteRate.car
    ),
    moto: Math.round(
      baseFare.moto +
        (distanceTime.distance.value / 1000) * perKmRate.moto +
        (distanceTime.duration.value / 60) * perMinuteRate.moto
    ),
  };

  return fare;
}

module.exports = getFare;

module.exports.CreateRide = async ({
  user,
  pickUp,
  destination,
  vehicleType,
}) => {
  if (!user || !pickUp || !destination || !vehicleType) {
    throw new Error("All feilds are Required");
  }

  const fare = await getFare(pickUp, destination);
  const otp = Math.floor(100 + Math.random() * 900);

  const ride = await RideModel.create({
    user,
    pickUp,
    destination,
    otp,
    fare: fare[vehicleType],
    vehicleType,
  });

  return ride;
};

module.exports.UpdateRide = async (CaptainId, RideId) => {
  try {
    // Update the ride with the provided RideId
    console.log("RideId :", RideId);

    const Ride = await RideModel.findByIdAndUpdate(
      RideId,
      {
        captain: CaptainId,
        status: "accepted",
      },
      {
        new: true,
        select: "+otp",
      }
    ).populate("captain");

    if (!Ride) {
      throw new Error("Ride not found or unable to update");
    }

    console.log("Updated Ride:", Ride);

    return Ride;
  } catch (error) {
    console.error("Error updating ride:", error.message);
    throw new Error(error.message);
  }
};

module.exports.StartRide = async (otp, Rideid) => {
  try {
    const ride = await RideModel.findById(Rideid).select("+otp").populate('user').populate('captain');
    console.log(ride);

    if (ride.otp === otp) {
      ride.status = "ongoing";
    } else {
      throw Error("Wrong otp!");
    }

    return ride;
  } catch (error) {
    console.log(error);
    throw Error("Failed to Update Ride in Start Ride");
  }
};
