import { z } from "zod";

export const reviewSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80, "Use no more than 80 characters for your name."),
  rating: z.number().int().min(1, "Choose a star rating.").max(5),
  comment: z.string().trim().min(10, "Please write at least 10 characters.").max(2000, "Please keep your review under 2,000 characters."),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
export type Review = ReviewInput & { id: string; created_at: string };