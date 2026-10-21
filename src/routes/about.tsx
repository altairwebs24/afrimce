import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { projects } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About AfriMce — Interior Craftsmanship in Mokopane" },
      { name: "description", content: "AfriMce (Pty) Ltd designs and builds luxury interiors and custom cabinetry in Mokopane." },
      { property: "og:title", content: "About AfriMce" },
      { property: "og:description", content: "Luxury interiors and custom cabinetry from Mokopane." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Our Story" title="Designed with intent, built to last" />
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 pb-24 md:grid-cols-2">
        <img src={projects[5]!.img} alt="Oak pantry wall by AfriMce" className="aspect-[4/5] w-full object-cover" />
        <div className="space-y-6 text-muted-foreground">
          <p className="font-display text-3xl leading-snug text-foreground">AfriMce (Pty) Ltd is a Mokopane-based interior studio creating homes that feel considered, calm and unmistakably refined.</p>
          <p>From the first sketch to the final installation, we handle every detail — selecting finishes, manufacturing cabinetry and fitting each piece with precision.</p>
          <p>Our signature is the balance of rich materials: marble, warm timber, gloss lacquer and soft integrated lighting.</p>
          <div className="grid grid-cols-3 gap-6 border-t pt-8 text-center">
            {[["5", "Specialities"], ["100%", "Custom made"], ["1", "Dedicated team"]].map(([n, l]) => (
              <div key={l}><p className="font-serif text-4xl text-gold">{n}</p><p className="eyebrow mt-2 text-[0.6rem]">{l}</p></div>
            ))}
          </div>
          <Link to="/contact" className="btn-gold">Work With Us</Link>
        </div>
      </section>
    </SiteLayout>
  );
}
