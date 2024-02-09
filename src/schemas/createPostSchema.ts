import z from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(255, { message: "Title must be at most 255 characters long" }),

  slug: z.string().min(1, { message: "Slug is required" }),
  content: z
    .string()
    .min(1, { message: "Content is required" })
    .max(1000, { message: "Content must be at most 1000 characters long" }),
  status: z.string().optional(),
  featureImage: z.string().optional(),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;
