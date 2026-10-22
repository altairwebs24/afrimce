import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { reviewSchema, type ReviewInput } from "./reviews";

function publicClient(url: string, key: string) {
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => {
      const headers = new Headers(init?.headers);
      if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
      headers.set("apikey", key);
      return fetch(input, { ...init, headers });
    } },
  });
}

export const listReviews = createServerFn({ method: "GET" }).handler(async () => {
  const client = publicClient(process.env["SUPABASE_URL"]!, process.env["SUPABASE_PUBLISHABLE_KEY"]!);
  const { data, error } = await client.from("customer_reviews").select("id,name,rating,comment,created_at")
    .order("created_at", { ascending: false }).order("name").limit(100);
  return { reviews: data ?? [], error: error ? "Reviews are temporarily unavailable." : null };
});

export const submitReview = createServerFn({ method: "POST" })
  .inputValidator((input: ReviewInput) => reviewSchema.parse(input))
  .handler(async ({ data }) => {
    const client = publicClient(process.env["SUPABASE_URL"]!, process.env["SUPABASE_PUBLISHABLE_KEY"]!);
    const { error } = await client.from("customer_reviews").insert(data);
    if (error) return { ok: false, error: error.code === "23505" ? "This review has already been submitted." : "Your review could not be saved. Please try again." };
    return { ok: true, error: null };
  });