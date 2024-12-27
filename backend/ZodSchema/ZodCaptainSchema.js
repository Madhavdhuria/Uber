const { z } = require("zod");

const captainValidationSchema = z.object({
  fullName: z.object({
    firstName: z
      .string()
      .min(3, "First name must be at least 3 characters long"),
    lastName: z
      .string()
      .min(3, "Last name must be at least 3 characters long")
      .optional(), 
  }),
  email: z
    .string()
    .email("Invalid email format"),
  password: z
    .string()
    .min(1, "Password is required"), 
  socketId: z
    .string()
    .optional(),
  status: z
    .enum(["active", "inactive"])
    .default("inactive"),
  vehicle: z.object({
    color: z
      .string()
      .min(3, "Color must be at least 3 characters long"),
    plate: z
      .string()
      .min(4, "Plate must be at least 4 characters long"),
    capacity: z
      .string()
      .min(1, "Vehicle must have at least 1 capacity"),
    vehicleType: z
      .enum(["motorcycle", "car", "auto"]),
  }),
  location: z.object({
    lat: z
      .number()
      .optional(), 
    lng: z
      .number()
      .optional(), 
  }).optional(), 
});

module.exports = captainValidationSchema;
