const { z } = require("zod");

const userValidationSchema = z.object({
    fullName: z.object({
      firstName: z
        .string()
        .min(3, "First name must be at least 3 characters long"),
      lastName: z
        .string()
        .min(3, "Last name must be at least 3 characters long")
        .optional().nullable(),
    }),
    email: z
      .string()
      .email("Invalid email format"),
    password: z
      .string()
      .min(1, "Password is required"),
    socketId: z.string().optional(),
});


module.exports=userValidationSchema;