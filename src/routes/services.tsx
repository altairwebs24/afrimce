import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { projects, services } from "@/lib/site";

const imgs = [projects[5]!.img, projects[2]!.img, projects[1]!.img, projects[3]!.img, projects[0]!.img];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Kitchens, Wardrobes, Vanities & TV Stands | AfriMce" },
      { name: "description", content: "Interior design, bespoke kitchens, wardrobes, vanities and TV stands by AfriMce." },
      { property: "og:title", content: "AfriMce Services" },
      { property: "og:description", content: "Interior design, kitchens, wardrobes, vanities and TV stands." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <SiteLayout>
      <PageHeader eyebrow="Services" title="What We Create" text="Five specialities, one standard of excellence." />
      <section className="mx-auto max-w-7xl space-y-20 px-6 pb-24">
        {services.map((s, i) => (
          <div key={s.title} className="grid items-center gap-10 md:grid-cols-2">
            <img src={imgs[i]} alt={s.title} loading="lazy" className={`aspect-[4/3] w-full object-cover ${i % 2 ? "md:order-2" : ""}`} />
            <div>
              <p className="font-serif text-5xl text-gold">0{i + 1}</p>
              <h2 className="mt-4 text-4xl md:text-5xl">{s.title}</h2>
              <p className="mt-5 text-muted-foreground">{s.text}</p>
            </div>
          </div>
        ))}
      </section>
    </SiteLayout>
  ),
});
