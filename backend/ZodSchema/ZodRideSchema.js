const { z } = require("zod");

const CreateRideSchema = z.object({
  pickUp: z.string().nonempty("Pick-up location is required"),
  destination: z.string().nonempty("Destination is required"),
  status: z
    .enum(["pending", "accepted", "ongoing", "completed", "cancelled"])
    .default("pending"),
  duration: z.number().optional(),
  distance: z.number().positive("Distance must be a positive number").optional(),
  paymentID: z.string().optional(),
  orderId: z.string().optional(),
  signature: z.string().optional(),
  vehicleType: z.enum(["auto", "moto", "car"], "Vehicle type is required"),
});

module.exports = CreateRideSchema;
