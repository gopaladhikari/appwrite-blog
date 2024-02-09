import z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" }),
  email: z
    .string()
    .min(3, { message: "Email must be at least 3 characters long" })
    .max(50, { message: "Email must be at most 50 characters long" })
    .email({ message: "Email must be a valid email address" }),
  password: z
    .string()
    .min(8, { message: "String must be at least 8 characters long" })
    .regex(/^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message:
        "String must contain at least one number and one special character",
    }),
});

export type Register = z.infer<typeof registerSchema>;
