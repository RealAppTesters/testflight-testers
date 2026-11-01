"use client";
import { useState } from "react";
import Link from "next/link";
import { articles } from "@/lib/articles";
export default function ArticleList() {
  const [category, setCategory] = useState("All articles");
  const [search, setSearch] = useState("");
  const filtered = articles.filter(
    (a) =>
      (category === "All articles" || a.category === category) &&
      `${a.title} ${a.description}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <>
      <div className="e-filters">
        <div>
          {["All articles", ...new Set(articles.map((a) => a.category))].map(
            (c) => (
              <button
                key={c}
                className={category === c ? "selected" : ""}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ),
          )}
        </div>
        <input
          aria-label="Search articles"
          placeholder="Search the journal…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="e-article-grid">
        {filtered.map((a, i) => (
          <Link
            className="e-article-card"
            key={a.slug}
            href={`/blog/${a.slug}`}
          >
            <div className={`e-cover cover-${i % 4}`}>
              <span>{["↗", "◎", "▦", "✓"][i % 4]}</span>
              <small>THE TESTFLIGHTTESTERS JOURNAL</small>
            </div>
            <div className="e-card-body">
              <span className="e-category">{a.category}</span>
              <h2>{a.title}</h2>
              <p>{a.description}</p>
              <div className="e-meta">
                {a.date} · {a.readTime}
                <span>↗</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {!filtered.length && <p>No articles match your search.</p>}
    </>
  );
}
