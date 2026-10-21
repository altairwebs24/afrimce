import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { contact } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact AfriMce — Mokopane Interior Design" },
      { name: "description", content: "Call 069 352 4476 or email aprilmcephe@gmail.com. AfriMce is based in Mokopane." },
      { property: "og:title", content: "Contact AfriMce" },
      { property: "og:description", content: "Get in touch with AfriMce in Mokopane." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const items = [
    { label: "Call", value: contact.phone, href: contact.phoneHref },
    { label: "WhatsApp", value: contact.phone, href: contact.whatsapp },
    { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { label: "Location", value: contact.location },
  ];
  return (
    <SiteLayout>
      <PageHeader eyebrow="Contact" title="Begin Your Project" text="Tell us about your space — we'll reply with ideas and a quote." />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 md:grid-cols-2">
        <div className="grid gap-px bg-border">
          {items.map((it) => (
            <div key={it.label} className="bg-background p-8">
              <p className="eyebrow">{it.label}</p>
              {it.href ? (
                <a href={it.href} className="mt-3 block break-all font-display text-3xl hover:text-gold">{it.value}</a>
              ) : <p className="mt-3 font-display text-3xl">{it.value}</p>}
            </div>
          ))}
        </div>
        <iframe title="AfriMce location — Mokopane" className="min-h-[420px] w-full border grayscale"
          src="https://www.google.com/maps?q=Mokopane,Limpopo&output=embed" loading="lazy" />
      </section>
    </SiteLayout>
  );
}
