// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { guides, sidebar } from "./src/sidebar.mjs";

/**
 * Garth's documentation: the user guide, the admin guide and the release
 * notes as one site, styled as Toft's are.
 *
 * Published to GitHub Pages under /garth-docs/. One version, the newest:
 * Garth is 0.0.N and each release only adds to it, so there is nothing to
 * keep per version except the notes, which are pages of their own.
 */
const base = (process.env.DOCS_BASE ?? "/garth-docs").replace(/\/+$/, "");

export default defineConfig({
  base,
  trailingSlash: "always",
  // Each guide's front door is its first page. The site's own is the home
  // page (src/content/docs/index.mdx): one combined site needs somewhere that
  // says it holds three guides.
  redirects: {
    "/user/": `${base}/${guides[0].first}/`,
    "/admin/": `${base}/${guides[1].first}/`,
  },
  integrations: [
    starlight({
      title: "Garth",
      logo: {
        light: "./src/assets/logo.svg",
        dark: "./src/assets/logo-dark.svg",
        alt: "Garth",
      },
      description: "How to work with the agent in Garth, run an install, and what changed in each release.",
      favicon: "/favicon.svg",
      // Light and dark, following the reader's OS until they pick (toft.css
      // holds both palettes). The platform itself stays light-only.
      components: {
        // The header's right-hand slot holds the guide switcher and the
        // GitHub link; the site title carries the version.
        SocialIcons: "./src/components/HeaderLinks.astro",
        SiteTitle: "./src/components/SiteTitle.astro",
        Sidebar: "./src/components/Sidebar.astro",
        PageTitle: "./src/components/PageTitle.astro",
        Hero: "./src/components/Hero.astro",
      },
      // One guide in the sidebar, and a Markdown alternate on every page.
      routeMiddleware: "./src/routeData.ts",
      // Code reads against the page, not a terminal window: a syntax theme per
      // page theme, the hairline every other surface has, and no window chrome.
      expressiveCode: {
        themes: ["github-dark", "github-light"],
        // A command is copied whole, so it is read whole: shell blocks wrap
        // rather than hiding the end of a long URL behind a scrollbar.
        defaultProps: {
          overridesByLang: {
            "bash,sh,shell,shellscript,zsh,console,powershell,ps,ps1,bat,cmd": {
              wrap: true,
              preserveIndent: true,
            },
          },
        },
        styleOverrides: {
          borderRadius: "0.5rem",
          borderColor: "var(--lp-border)",
          codeFontFamily: "var(--sl-font-mono)",
          codeFontSize: "0.8125rem",
          codeLineHeight: "1.65",
          codeBackground: "var(--lp-muted)",
          frames: {
            shadowColor: "transparent",
            frameBoxShadowCssValue: "none",
            editorTabBarBackground: "var(--lp-card)",
            editorActiveTabBackground: "var(--lp-card)",
            editorActiveTabIndicatorTopColor: "transparent",
            editorActiveTabIndicatorBottomColor: "var(--lp-primary)",
            terminalBackground: "var(--lp-muted)",
            terminalTitlebarBackground: "var(--lp-card)",
            terminalTitlebarBorderBottomColor: "var(--lp-border)",
            terminalTitlebarDotsOpacity: "0",
            inlineButtonBorder: "var(--lp-border)",
          },
        },
      },
      customCss: [
        "@fontsource-variable/geist",
        "@fontsource-variable/geist-mono",
        "./src/styles/toft.css",
      ],
      pagination: true,
      lastUpdated: false,
      pagefind: true,
      sidebar,
    }),
  ],
});
