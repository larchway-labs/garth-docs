// @ts-check
/**
 * The three guides' tables of contents, in reading order.
 *
 * Its own module because three things read it: Starlight's sidebar
 * (astro.config.mjs), the home page's map of every guide, and the Markdown
 * outputs for coding agents (src/pages/llms*.txt.ts).
 *
 * The release notes are not listed by hand: every file in
 * src/content/docs/releases/ is a release, newest first, so a release only
 * has to add its page (Garth's release workflow does that).
 */
import { readdirSync } from "node:fs";

/** The user guide's sections. */
const user = [{ label: "Get started", items: [{ label: "What Garth is", slug: "user/start/what-garth-is" }, { label: "Signing in", slug: "user/start/signing-in" }, { label: "Your first session", slug: "user/start/first-session" }, { label: "Finding your way around", slug: "user/start/finding-your-way" }] }, { label: "Projects", items: [{ label: "Creating a project", slug: "user/projects/creating" }, { label: "The project page", slug: "user/projects/the-project-page" }, { label: "What the agent reads", slug: "user/projects/what-the-agent-reads" }, { label: "Project settings", slug: "user/projects/settings" }] }, { label: "Sessions", items: [{ label: "The session page", slug: "user/sessions/the-session-page" }, { label: "Committing and merging", slug: "user/sessions/changes-and-merging" }, { label: "The terminal and files", slug: "user/sessions/terminal-and-files" }, { label: "Previewing an app", slug: "user/sessions/previews" }, { label: "Pausing, ending and past sessions", slug: "user/sessions/pausing-and-ending" }] }, { label: "Sharing", items: [{ label: "Sharing a project", slug: "user/sharing/sharing-a-project" }, { label: "Sharing a live session", slug: "user/sharing/sharing-a-session" }, { label: "Groups", slug: "user/sharing/groups" }] }, { label: "Toft", items: [{ label: "Deploying to Toft", slug: "user/toft/deploying" }, { label: "Opening a project from Toft", slug: "user/toft/open-in-garth" }] }, { label: "Your account", items: [{ label: "Your profile", slug: "user/account/your-profile" }, { label: "Usage and budgets", slug: "user/account/usage" }] }];

/** The admin guide's sections. */
const admin = [{ label: "Get started", items: [{ label: "Architecture", slug: "admin/start/architecture" }, { label: "First run", slug: "admin/start/first-run" }, { label: "Upgrading", slug: "admin/start/upgrading" }] }, { label: "Install", items: [{ label: "One k3s box", slug: "admin/install/single-node" }, { label: "A cluster", slug: "admin/install/cluster" }, { label: "Reverse proxy and address", slug: "admin/install/reverse-proxy" }, { label: "The session image", slug: "admin/install/session-image" }] }, { label: "Sign-in and people", items: [{ label: "Single sign-on", slug: "admin/identity/single-sign-on" }, { label: "The local administrator", slug: "admin/identity/local-administrator" }, { label: "Who can join", slug: "admin/identity/who-can-join" }, { label: "People", slug: "admin/identity/people" }, { label: "Groups and tags", slug: "admin/identity/groups-and-tags" }] }, { label: "Configure", items: [{ label: "Settings", slug: "admin/config/settings" }, { label: "Models", slug: "admin/config/models" }, { label: "Budgets and alerts", slug: "admin/config/budgets-and-alerts" }, { label: "Sandbox and network", slug: "admin/config/sandbox-and-network" }, { label: "Trusted sources", slug: "admin/config/trusted-sources" }, { label: "Git hosts", slug: "admin/config/git-hosts" }, { label: "Toft installs", slug: "admin/config/toft-installs" }, { label: "Email and Slack", slug: "admin/config/email-and-slack" }] }, { label: "Operate", items: [{ label: "Monitoring", slug: "admin/operate/monitoring" }, { label: "Projects", slug: "admin/operate/projects" }, { label: "Activity", slug: "admin/operate/activity" }, { label: "System", slug: "admin/operate/system" }, { label: "License", slug: "admin/operate/license" }] }, { label: "Reference", items: [{ label: "Environment reference", slug: "admin/reference/environment" }] }];

/** Every released version with a page, newest first: "0.0.6", "0.0.5", … */
export function releasedVersions() {
  const dir = new URL("./content/docs/releases/", import.meta.url);
  return readdirSync(dir)
    .map((f) => /^v(\d+)-(\d+)-(\d+)\.mdx?$/.exec(f))
    .filter((m) => m !== null)
    .map((m) => [Number(m[1]), Number(m[2]), Number(m[3])])
    .sort((a, b) => b[0] - a[0] || b[1] - a[1] || b[2] - a[2])
    .map((v) => v.join("."));
}

const releases = [
  { label: "Release notes", items: [{ label: "Every release", slug: "releases" }] },
  {
    label: "Releases",
    items: releasedVersions().map((v) => ({ label: `Garth ${v}`, slug: `releases/v${v.replaceAll(".", "-")}` })),
  },
];

export const sidebar = [
  { label: "User guide", items: user },
  { label: "Admin guide", items: admin },
  { label: "Release notes", items: releases },
];

/**
 * The three guides as the home page and the agent index name them: who each is
 * for, in one line. The label is the sidebar group's, so the two cannot drift.
 */
const AUDIENCE = {
  user: "For people who work with the agent: projects, sessions, merging and sharing.",
  admin: "For whoever installs Garth and keeps it running.",
  releases: "What changed in each version of Garth, newest first.",
};

export const guides = sidebar.map((group) => {
  const first = firstSlug(group);
  const id = first.split("/")[0];
  return { id, label: group.label, audience: AUDIENCE[id], first, group };
});

/** The first page of a group, in reading order. */
function firstSlug(item) {
  return item.slug ?? firstSlug(item.items[0]);
}

/** Every page in reading order, each with the guide and section it sits in. */
export function readingOrder() {
  const pages = [];
  for (const guide of guides) {
    for (const section of guide.group.items) {
      for (const page of section.items ?? [section]) {
        pages.push({ slug: page.slug, label: page.label, guide, section: section.label });
      }
    }
  }
  return pages;
}
