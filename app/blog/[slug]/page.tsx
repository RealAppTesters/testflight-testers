import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, appleSources } from "@/lib/articles";
import PublicFrame, { EditorialCTA } from "@/components/PublicFrame";
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  return article
    ? {
        title: `${article.title} | TestFlightTesters`,
        description: article.description,
        alternates: { canonical: `/blog/${slug}` },
      }
    : {};
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  if (!a) notFound();
  return (
    <PublicFrame>
      <article className="e-reading">
        <Link href="/blog" className="e-back">
          ← Back to the journal
        </Link>
        <span className="e-category">{a.category}</span>
        <h1>{a.title}</h1>
        <p className="e-deck">{a.description}</p>
        <div className="e-meta">
          TestFlightTesters editorial · {a.date} · {a.readTime}
        </div>
        {a.sections.map(([heading, ...paragraphs]) => (
          <section key={heading}>
            <h2>{heading}</h2>
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
        ))}
        <aside className="e-note">
          <h3>Continue planning your test</h3>
          <p>
            Read <Link href="/how-we-test">how we test</Link>, explore an{" "}
            <Link href="/case-studies">illustrative testing brief</Link>, or use
            the <Link href="/pricing">pricing calculator</Link> to choose your
            scope.
          </p>
        </aside>
        <h3>Official platform references</h3>
        <p className="e-source-note">
          Check Apple’s documentation for the current platform requirements.
        </p>
        <ul>
          {appleSources.map((s) => (
            <li key={s.url}>
              <a href={s.url} rel="noreferrer" target="_blank">
                {s.title} ↗
              </a>
            </li>
          ))}
        </ul>
        <h2>Keep reading</h2>
        {articles
          .filter((b) => b.slug !== slug && b.category === a.category)
          .slice(0, 3)
          .map((b) => (
            <p key={b.slug}>
              <Link href={`/blog/${b.slug}`}>{b.title} →</Link>
            </p>
          ))}
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title,
            description: a.description,
            datePublished: a.date,
            author: { "@type": "Organization", name: "TestFlightTesters" },
            mainEntityOfPage: `https://www.testflighttesters.com/blog/${slug}`,
          }).replace(/</g, "\\u003c"),
        }}
      />
      <EditorialCTA />
    </PublicFrame>
  );
}
