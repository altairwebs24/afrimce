CREATE TABLE public.customer_reviews (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL CHECK (char_length(btrim(name)) BETWEEN 2 AND 80),
 rating smallint NOT NULL CHECK (rating BETWEEN 1 AND 5),
 comment text NOT NULL CHECK (char_length(btrim(comment)) BETWEEN 10 AND 2000),
 created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE (name, rating, comment)
);
GRANT SELECT, INSERT ON public.customer_reviews TO anon, authenticated;
GRANT ALL ON public.customer_reviews TO service_role;
ALTER TABLE public.customer_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reviews are readable" ON public.customer_reviews FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Customers can submit reviews" ON public.customer_reviews FOR INSERT TO anon, authenticated WITH CHECK (created_at <= now() AND created_at > now() - interval '1 minute');
CREATE INDEX customer_reviews_recent ON public.customer_reviews (created_at DESC);