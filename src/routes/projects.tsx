import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/site";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — AfriMce Portfolio" },
      { name: "description", content: "Explore AfriMce kitchens, wardrobes, TV stands and interiors completed across Limpopo." },
      { property: "og:title", content: "Projects — AfriMce Portfolio" },
      { property: "og:description", content: "Kitchens, wardrobes, TV stands and interiors by AfriMce." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <SiteLayout>
      <PageHeader eyebrow="Portfolio" title="Our Projects" text="Every piece is designed, built and installed by our team." />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => <ProjectCard key={p.title} p={p} index={i} />)}
      </section>
    </SiteLayout>
  ),
});
