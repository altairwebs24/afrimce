import { queryOptions } from "@tanstack/react-query";
import { listReviews } from "./reviews.functions";

export const reviewsQueryOptions = queryOptions({
  queryKey: ["customer-reviews"],
  queryFn: () => listReviews(),
});