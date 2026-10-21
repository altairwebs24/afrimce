import type { Project } from "@/lib/site";

export function ProjectCard({ p, index }: { p: Project; index: number }) {
  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={p.img} alt={p.title} loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-veil" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="eyebrow">{String(index + 1).padStart(2, "0")} — {p.category}</p>
          <h3 className="mt-2 text-3xl text-ivory md:text-4xl">{p.title}</h3>
        </div>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
    </article>
  );
}
