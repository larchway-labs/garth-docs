---
title: The project page
description: A project's tabs — Overview, Files, Sessions, Usage, Access and Settings — and the button that starts or resumes your session.
---

Open a project from **Projects**. The line under its name says who owns it, its
default branch, and how many sessions are live or paused on it.

## The button at the top

| You see | It means |
|---|---|
| **Start a session** | You have no live session here. Choose it to start one. |
| **Resume your session** | You have one running. Choose it to go back. |
| **Resume your paused session** | Yours is paused. Opening it offers **Resume session**. |
| **View only** | You can read the project but not start sessions — usually an administrator looking at a project nobody shared with them. |
| **Archived** | Nobody can start a session until it is unarchived. |

The **⋯** menu beside **Resume** has **End session…**, for when the session's own
page will not open.

## Tabs

| Tab | What it shows |
|---|---|
| **Overview** | Recent commits on the default branch, what the agent reads, live sessions, and a summary. |
| **Files** | The repository, read-only, on any branch. |
| **Sessions** | Every session on the project, live and ended. |
| **Usage** | What sessions on this project have spent. |
| **Access** | Who has the project. |
| **Settings** | Only for the owner. See [Project settings](../settings/). |

## Overview

- **Recent commits on main** — what every new session starts from. A session's
  work reaches it only by a merge.
- **What the agent reads** — links to `AGENTS.md`, `memory/` and `.pi/skills/`
  in **Files**. See [What the agent reads](../what-the-agent-reads/).
- **Live sessions** — who is working here now, one row per person.
- **Summary** — owner, source, how merging works, the default branch, and who
  has access. **Merging** says either *Any session merges into main here* or
  *Pull requests on GitHub* (or GitLab) for a project from a git host.

## Files

Pick a branch from the menu — the default branch, or any session's branch — and
browse it. Markdown files show rendered; choose **Source** to see the text.
**Download zip** downloads the branch as it is.

Files here are read-only. They change through a session and reach the default
branch by a merge.

## Sessions

Every session on the project, with who started it, its branch and its state.

- Your own live session opens when you choose its row.
- An ended session opens read-only, as its transcript. See
  [Past sessions](../../sessions/pausing-and-ending/#past-sessions).
- Someone else's live session does not open from here. They can
  [share it with you](../../sharing/sharing-a-session/).

The **⋯** on a row has **End session…** for a live one and **Delete session…**
for an ended one. You see them on your own sessions; the project's owner sees
them on everyone's.

## Usage

The project's spend on models, split by person or by model. It works like
[your own usage](../../account/usage/).
