import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Email must be a valid email address" })
    .min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type Login = z.infer<typeof loginSchema>;
