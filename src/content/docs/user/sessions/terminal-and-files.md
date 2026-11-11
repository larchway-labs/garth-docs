---
title: The terminal and files
description: A shell in your session's sandbox, and browsing or uploading files in its working copy.
---

The agent and you share one sandbox. What you change in the terminal, the agent
sees, and the other way round.

## The terminal

Choose **Terminal** in the session's header. A shell opens below the
conversation, in `/workspace/repo` — the project's clone.

- It is a real terminal: full-screen programs such as `vim`, `less` and `top`
  work.
- Drag its top edge to resize it. Double-click the edge, or choose the expand
  button, to fill the column. Garth remembers the height in this browser.
- The cross closes it. If the shell exits, close the terminal and open it again
  for a new one.

The terminal has the same network and the same session-only access as the
agent. It runs as the same account in the sandbox; what you commit carries your
git identity.

Only the session's own person gets a terminal. Your administrator can turn
terminals off for the whole install, and then the button is absent.

:::tip
Files you edit in the terminal show up under **Changes** when you open the tab
or choose **Refresh**.
:::

## The Files tab

**Files** in the session's panel browses the sandbox's working copy, including
what is not committed. Changed files are marked **M**, **A**, **U** or **D**.
Markdown shows rendered; choose **Source** for the text. A binary file is not
shown, though the agent can still read it.

To add files, choose **Upload**, or drop them on the folder you are in. They
land in that folder in the workspace. The paper clip in the message box does the
same into `uploads/`, and names the files in your message.

The working copy can be read only while the session runs.

## The project's Files tab

The **Files** tab on the project page is different: it shows a branch as it is in
Garth — pushed work only — and is read-only. **⋯ → Browse main** in a session
opens it. See [The project page](../../projects/the-project-page/#files).

## What the sandbox can reach

The sandbox reaches the internet only through Garth, and only the destinations
your administrator allows. Installing packages works from the registries and
mirrors they list; anything else is refused. Fetching another repository works
for the trusted sources and the project's
[other repositories](../../projects/settings/#other-repositories), using your
connection to the git host.

Fetches that are not git — the `gh` command, private package registries,
release downloads — have no way to your credentials, so they fail.
