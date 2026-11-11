/**
 * The index an agent reads first (llmstxt.org): what Toft is, then every page
 * in reading order with its one-line description, each linking to the page's
 * Markdown copy. The descriptions are the pages' own frontmatter, so a page
 * that lacks one is visible here as a bare link.
 */
import type { APIRoute } from "astro";
import { guides } from "../sidebar.mjs";
import { BASE, markdownHref, markdownResponse, pagesInOrder, versionLabel } from "../lib/markdown";

export const GET: APIRoute = async () => {
  const pages = await pagesInOrder();
  const lines = [
    "# Garth",
    "",
    "> Garth is a self-hosted place where a team works with a coding agent in the browser. Projects are git repositories; each session runs in its own sandbox on its own branch, and work lands by merging. These are its user guide, admin guide and release notes, for " +
      versionLabel() +
      ".",
    "",
    "Every link below is the Markdown copy of one page; adding `.md` to any page's address gives the same thing. Links inside the pages point at other pages' Markdown copies. Addresses are relative to this site's root.",
    "",
    "Each guide is also one file, and the whole site is one file:",
    "",
    ...guides.map((g) => `- [${g.label}](${BASE}/llms-${g.id}.txt): ${g.audience}`),
    `- [Everything](${BASE}/llms-full.txt): both guides and every release note, in reading order.`,
  ];
  let heading = "";
  for (const p of pages) {
    const h = `${p.guide.label}: ${p.section}`;
    if (h !== heading) {
      lines.push("", `## ${h}`, "");
      heading = h;
    }
    const d = p.entry.data.description;
    lines.push(`- [${p.entry.data.title}](${markdownHref(p.slug)})${d ? `: ${d}` : ""}`);
  }
  return markdownResponse(lines.join("\n") + "\n", "text/plain");
};
