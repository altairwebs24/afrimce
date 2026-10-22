import { describe, expect, it } from "vitest";
import { reviewSchema } from "@/lib/reviews";
import { contact } from "@/lib/site";

describe("Customer reviews", () => {
  it("accepts mixed ratings including two, three and four stars", () => {
    for (const rating of [2, 3, 4]) expect(reviewSchema.parse({ name: "Pieter Jacobs", rating, comment: "An honest review of the finished space." }).rating).toBe(rating);
  });
  it("rejects ratings outside the star scale", () => {
    for (const rating of [0, 6, 2.5]) expect(reviewSchema.safeParse({ name: "Client", rating, comment: "An honest review of the finished space." }).success).toBe(false);
  });
  it("rejects blank customer feedback", () => {
    expect(reviewSchema.safeParse({ name: "  ", rating: 4, comment: " " }).success).toBe(false);
  });
});

describe("AfriMce contact numbers", () => {
  it("keeps the original phone number", () => {
    expect(contact.phoneHref).toBe("tel:+27693524476");
  });
  it("adds 0630612069 as a second phone number", () => {
    expect(contact.additionalPhoneHref).toBe("tel:+27630612069");
  });
});