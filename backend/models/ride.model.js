const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    captain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "captain",
    },
    pickUp: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    fare: {
      type: Number,
      required: true,
      min: [0, "Fare must be a positive value"],
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
      default: "pending",
    },
    duration: {
      type: Number,
      min: [0, "Duration must be non-negative"],
      default: 0,
    },
    distance: {
      type: Number,
      min: [0, "Distance must be non-negative"],
      default: 0,
    },
    paymentID: String,
    orderId: String,
    signature: String,
    otp: {
      type: String,
      select: false,
      required: true,
    },
    vehicleType: {
      type: String,
      enum: ["auto", "moto", "car"],
      required: true,
    },
  },
  { timestamps: true }
);

const RideModel = mongoose.model("ride", rideSchema);

module.exports = RideModel;
