import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ProjectCard } from "@/components/ProjectCard";
import { featured, heroVideo, services, contact } from "@/lib/site";
import { Reviews } from "@/components/Reviews";
import { reviewsQueryOptions } from "@/lib/reviews.query";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(reviewsQueryOptions),
  head: () => ({
    meta: [
      { title: "AfriMce — Luxury Interiors, Kitchens & Wardrobes in Mokopane" },
      { name: "description", content: "Bespoke interior design, kitchens, wardrobes, vanities and TV stands crafted by AfriMce in Mokopane." },
      { property: "og:title", content: "AfriMce — Luxury Interiors & Cabinetry" },
      { property: "og:description", content: "Bespoke kitchens, wardrobes, vanities and TV stands in Mokopane." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <section className="relative h-[100svh] min-h-[600px] overflow-hidden">
        <video src={heroVideo} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-veil" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-24">
          <p className="eyebrow">Interior Design · Mokopane</p>
          <h1 className="mt-5 max-w-4xl text-5xl leading-[1.05] text-ivory md:text-8xl">
            Spaces crafted with <em className="font-serif text-gold-gradient">quiet luxury</em>
          </h1>
          <p className="mt-6 max-w-xl text-ivory/80">Kitchens, wardrobes, vanities and TV stands — designed and built to the last detail.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/projects" className="btn-gold">View Projects</Link>
            <Link to="/contact" className="btn-outline-gold">Book a Consultation</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="eyebrow">What we craft</p>
        <p className="mt-6 max-w-3xl font-display text-3xl leading-snug md:text-4xl">
          {services.map((s) => s.title).join(" · ")}
        </p>
        <Link to="/services" className="mt-8 inline-block text-xs uppercase tracking-[0.25em] text-gold">Explore services →</Link>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="mt-4 text-4xl md:text-6xl">Featured Projects</h2>
          </div>
        </div>
        <div className="mt-12 grid gap-12 sm:grid-cols-2">
          {featured.map((p, i) => <ProjectCard key={p.title} p={p} index={i} />)}
        </div>
        <div className="mt-14 text-center">
          <Link to="/projects" className="btn-outline-gold">View More</Link>
        </div>
      </section>

      <Reviews />

      <section className="border-y bg-secondary">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="text-4xl md:text-6xl">Let's design your <em className="font-serif text-gold-gradient">next space</em></h2>
           <p className="mt-6 text-muted-foreground">Call <a href={contact.phoneHref} className="hover:text-primary">{contact.phone}</a> or <a href={contact.additionalPhoneHref} className="hover:text-primary">{contact.additionalPhone}</a><br /><a href={`mailto:${contact.email}`} className="break-all hover:text-primary">{contact.email}</a></p>
          <Link to="/contact" className="btn-gold mt-10">Get in Touch</Link>
        </div>
      </section>
    </SiteLayout>
  );
}
