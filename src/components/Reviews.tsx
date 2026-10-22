import { useState, type FormEvent } from "react";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Star, PenLine, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { reviewsQueryOptions } from "@/lib/reviews.query";
import { submitReview } from "@/lib/reviews.functions";
import { reviewSchema } from "@/lib/reviews";

function Stars({ rating }: { rating: number }) {
  return <div className="flex gap-1 text-gold" role="img" aria-label={`${rating} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map(value => <Star key={value} aria-hidden="true" className={`h-4 w-4 ${value <= rating ? "fill-current" : "text-muted-foreground/40"}`} />)}
  </div>;
}

export function ReviewForm() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const save = useServerFn(submitReview);
  const queryClient = useQueryClient();

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const parsed = reviewSchema.safeParse({ name, rating, comment });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Please check your review."); return; }
    setSaving(true); setError("");
    try {
      const result = await save({ data: parsed.data });
      if (!result.ok) { setError(result.error ?? "Please try again."); return; }
      await queryClient.invalidateQueries({ queryKey: ["customer-reviews"] });
      setSuccess(true); setName(""); setRating(0); setComment("");
    } catch { setError("Your review could not be saved. Please try again."); }
    finally { setSaving(false); }
  }

  return <Dialog open={open} onOpenChange={value => { setOpen(value); if (value) { setSuccess(false); setError(""); } }}>
    <DialogTrigger asChild><Button variant="outline" size="lg" className="h-12 border-gold text-gold"><PenLine /> Leave a Review</Button></DialogTrigger>
    <DialogContent className="max-h-[90svh] w-[calc(100%-2rem)] overflow-y-auto">
      <DialogHeader><DialogTitle className="font-display text-3xl">Your AfriMce Experience</DialogTitle><DialogDescription>Share your honest feedback.</DialogDescription></DialogHeader>
      {success ? <div className="space-y-5 py-6 text-center" role="status"><CheckCircle2 className="mx-auto h-10 w-10 text-primary" /><p className="font-display text-2xl">Thank you for your review.</p><p className="text-sm text-muted-foreground">Your feedback is now published.</p><Button onClick={() => setOpen(false)}>Done</Button></div> :
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-2"><label htmlFor="review-name" className="text-sm font-medium">Your name</label><Input id="review-name" value={name} onChange={event => setName(event.target.value)} required minLength={2} maxLength={80} autoComplete="name" /></div>
          <fieldset><legend className="mb-2 text-sm font-medium">Your rating</legend><div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(value => <Button key={value} type="button" variant="ghost" size="icon" title={`${value} star${value > 1 ? "s" : ""}`} aria-label={`${value} star${value > 1 ? "s" : ""}`} aria-pressed={rating === value} onClick={() => setRating(value)} className="h-11 w-11 text-gold"><Star className={`!h-7 !w-7 ${value <= rating ? "fill-current" : ""}`} /></Button>)}
          </div></fieldset>
          <div className="space-y-2"><label htmlFor="review-comment" className="text-sm font-medium">Your review</label><Textarea id="review-comment" value={comment} onChange={event => setComment(event.target.value)} required minLength={10} maxLength={2000} rows={5} /><p className="text-xs text-muted-foreground">Your name, rating and review will be public.</p></div>
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <Button type="submit" size="lg" className="w-full" disabled={saving}>{saving ? "Submitting…" : "Submit Review"}</Button>
        </form>}
    </DialogContent>
  </Dialog>;
}

export function Reviews() {
  const { data } = useSuspenseQuery(reviewsQueryOptions);
  const [showAll, setShowAll] = useState(false);
  const average = data.reviews.length ? data.reviews.reduce((sum, review) => sum + review.rating, 0) / data.reviews.length : 0;
  return <section className="border-t bg-secondary" id="reviews">
    <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div><p className="eyebrow">Client voices</p><h2 className="mt-4 text-4xl md:text-6xl">AfriMce Reviews</h2>
          {data.reviews.length > 0 && <div className="mt-5 flex flex-wrap items-center gap-3"><span className="font-display text-3xl">{average.toFixed(1)}<span className="text-lg text-muted-foreground"> / 5</span></span><Stars rating={Math.round(average)} /><span className="text-sm text-muted-foreground">{data.reviews.length} reviews</span></div>}
        </div><ReviewForm />
      </div>
      {data.error ? <p className="mt-10 text-muted-foreground" role="status">{data.error}</p> : data.reviews.length === 0 ? <p className="mt-10 text-muted-foreground">Be the first to share your experience.</p> :
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {(showAll ? data.reviews : data.reviews.slice(0, 6)).map(review => <article key={review.id} className="border-t border-border pt-6">
            <div className="flex items-center justify-between gap-3"><Stars rating={review.rating} /><span className="text-xs text-muted-foreground">{review.rating}/5</span></div>
            <blockquote className="mt-4 text-sm leading-relaxed">“{review.comment}”</blockquote><p className="mt-5 font-medium">{review.name}</p>
          </article>)}
        </div>}
      {data.reviews.length > 6 && <div className="mt-10 text-center"><Button variant="outline" onClick={() => setShowAll(!showAll)}>{showAll ? "Show Fewer Reviews" : "View All Reviews"}</Button></div>}
    </div>
  </section>;
}