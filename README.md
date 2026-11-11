# Garth documentation

The user guide, the admin guide and the release notes for Garth, as one site:
**https://larchway-labs.github.io/garth-docs/**

Garth's Documentation tab links here, and to the notes for the version it runs.
Built the way Toft's documentation is (Astro + Starlight + Pagefind, the same
styling), with one version: the newest. Every push to `main` republishes it.

## Release notes

`src/content/docs/releases/v0-0-N.md` is one release. Nothing lists them by
hand: the sidebar, the version beside the title and the agent index all read
that folder. Garth's release workflow writes the page when a release is tagged
(from `release-notes/0.0.N.md` in Garth's repository) and pushes it here.

## Layout

| Path | What |
|---|---|
| `src/content/docs/user/` | The user guide: projects, sessions, merging and sharing |
| `src/content/docs/admin/` | The admin guide: installing and running Garth |
| `src/content/docs/releases/` | The release notes, one page per version |
| `astro.config.mjs` | One Starlight site, and the components it overrides |
| `src/sidebar.mjs` | The three guides' tables of contents — the sidebar, the home page's map and the agent index all read it |
| `src/components/` | The header (version badge, guide switcher, GitHub link), the page head (section, title, description, Copy page menu), the task cards and guide map on the home page, diagrams |
| `src/routeData.ts` | Per page: the sidebar shows only the current guide, and `<head>` names the page's Markdown copy |
| `src/pages/` + `src/lib/` | The Markdown outputs for coding agents, below |
| `scripts/build-site.sh` | Builds every published version into `site/` |
| `.github/workflows/pages.yml` | Publishes `site/` to GitHub Pages |

Astro + Starlight + Pagefind. Search is a static index built into each
version's folder, so it searches that version only, and it works on a mirror
with no route to the internet.

## For coding agents

Every version's folder also holds plain Markdown, built from the same source:

| Path | What |
|---|---|
| `llms.txt` | The index ([llmstxt.org](https://llmstxt.org)): every page in reading order with its frontmatter description, linking to its Markdown copy |
| `llms-user.txt`, `llms-admin.txt`, `llms-releases.txt` | One guide per file |
| `llms-full.txt` | Everything in one file |
| `<page>.md` | Any page: `/user/start/first-app/` is also `/user/start/first-app.md` |

Asides become blockquotes and links between pages point at the Markdown copies.
A page that uses Starlight's `<Steps>` or `<Tabs>` is `.mdx`; its import and the
wrapper tags are dropped from the Markdown copy, and a tab's label becomes a bold
line (`src/lib/markdown.ts` matches each tag only on a line of its own). Code in
several SDK languages goes in `<Tabs syncKey="lang">`, labelled Python, Node, Go,
R in that order; an OS choice uses `syncKey="os"`; a procedure of three or more
steps is a `<Steps>` list.

**Diagrams** are SVG files in `src/diagrams/`, drawn only with the `dg-*` classes
in `toft.css` § Diagrams so they follow the light and dark themes, and placed with
`<Diagram name="…" alt="…" caption="…" />` on one line (no double quotes inside
the values). The alt text is what an agent gets in the Markdown copy, so it
describes the whole picture, not just names it.
**Every link is root-relative, never a full URL**, for the reason the HTML's
are: a mirror copied onto another host keeps working. A page's `description` is
its line in `llms.txt` and its lede under the title, so every page needs one.
