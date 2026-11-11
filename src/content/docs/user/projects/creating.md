---
title: Creating a project
description: Start a project empty, from a starter app, or by importing a repository from your git host.
---

On **Projects**, choose **New project**. Anyone signed in can create one; you
own what you create.

| Field | |
|---|---|
| **Name** | Shown on the project list and in every session. You can change it later. |
| **Import from** | Optional. A repository address, such as `https://github.com/your-org/your-repo.git`. |
| **Start from** | Only when you are not importing: **Empty**, or a starter app. |
| **Share with** | Optional. People who may work on it. See [Sharing a project](../../sharing/sharing-a-project/). |
| **Start a session on it now** | Ticked, Garth opens a session as soon as the project exists. |

## Starting empty

**Empty** gives you a repository with three things in it: `AGENTS.md`,
`memory/` and `.pi/skills/`. They are how the agent learns about the project —
see [What the agent reads](../what-the-agent-reads/).

The repository is **hosted here**: it lives in Garth, and sessions merge into
it in Garth.

## Starting from a starter

A starter is a small working app with a `toft.toml`, ready to
[deploy to Toft](../../toft/deploying/) as it is:

| Starter | What it is |
|---|---|
| **Python (Flask)** | A web app with a page and a health check. |
| **Node (Express)** | An API and the page that calls it. |
| **Go** | A single-binary web service, standard library only. |
| **R (plumber)** | An HTTP API over R's statistics. |

Its `AGENTS.md` has a section on deploying, so the agent knows how.

## Importing a repository

Paste the repository's address into **Import from**. Garth clones it once, and
sessions work on that copy.

- **A project from a git host** (GitHub or GitLab, set up by your
  administrator) carries your session branches on to the host when you push,
  as you. Review and merging happen there. See
  [Committing and merging](../../sessions/changes-and-merging/#projects-from-a-git-host).
- **A private repository** needs your account on that host. Connect it first
  under **Your profile → Connections**.

Your administrator decides where projects may be imported from. The help under
the field lists the allowed sources, and an address outside them is refused
with the reason. If it says **Importing is turned off here**, every project
starts empty.

## When creating fails

The message appears under **Name** and says what to change. The usual causes:

- The address has a password or token in it. Leave it out and connect the git
  host under **Your profile → Connections** instead.
- The address is not `https://`. `ssh://` and `git@` addresses work only for a
  connected git host.
- The address is outside the allowed sources.
- The repository is private and you have not connected an account that can
  read it.

If the project is created but the session could not start, Garth says so and
opens the project instead. Choose **Start a session** there.
