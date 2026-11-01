import Link from "next/link";
import { notFound } from "next/navigation";
import PublicFrame, { EditorialCTA } from "@/components/PublicFrame";
import { caseStudies } from "@/lib/case-studies";
export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  return study
    ? {
        title: `${study.name} — Illustrative Case Study | TestFlightTesters`,
        description: study.summary,
        alternates: { canonical: `/case-studies/${slug}` },
      }
    : {};
}
export default async function Case({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = caseStudies.find((c) => c.slug === slug);
  if (!c) notFound();
  return (
    <PublicFrame>
      <article className="e-reading">
        <Link href="/case-studies" className="e-back">
          ← All examples
        </Link>
        <span className="e-category">ILLUSTRATIVE EXAMPLE</span>
        <h1>{c.name}</h1>
        <p className="e-deck">{c.summary}</p>
        <div className="e-note">
          Fictional app and findings. This is not genuine client work.
        </div>
        {[
          ["App overview", c.overview],
          ["Testing objectives", c.objectives],
          ["Testing scope", c.scope],
          ["Testing approach", c.approach],
          ["Illustrative findings", c.findings],
          ["Recommendations", c.recommendations],
          ["QA report example", c.report],
        ].map(([h, p]) => (
          <section key={h}>
            <h2>{h}</h2>
            <p>{p}</p>
          </section>
        ))}
      </article>
      <EditorialCTA />
    </PublicFrame>
  );
}
