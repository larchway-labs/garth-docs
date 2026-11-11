---
title: What Garth is
description: A place in your browser where your team works with a coding agent, each person in a sandbox of their own, on projects that are git repositories.
---

Garth is where your team works with a coding agent. You open a project, start
a session, and tell the agent what you want. It reads the code, edits files and
runs commands in a sandbox of its own. You watch it work, step in, and decide
what to keep.

Everything happens in the browser. There is nothing to install.

## What you get

| | |
|---|---|
| **Projects** | Git repositories, created in Garth or imported from your git host. |
| **Sessions** | You and the agent, on your own branch, in a sandbox nobody else shares. |
| **Merging** | One button puts a session's work on the project's default branch — or, for a project from a git host, your branch goes there for a pull request. |
| **Shared instructions** | `AGENTS.md`, `memory/` and `.pi/skills/` live in the repository, so every teammate's agent follows the same ones. |
| **A terminal and previews** | A shell in the sandbox, and the app the agent is running, seen in a tab. |
| **Deploys to Toft** | The agent deploys to Toft as you, without a key ever entering the sandbox. |
| **Usage** | What each session costs, live, and what you have spent this month. |

## Three words

**Project** — a git repository with the people who may work on it. Its default
branch is what every new session starts from.

**Session** — one person, one project, one branch, one sandbox. You have at most
one live session per project; opening the project again takes you back to it.

**Sandbox** — the locked-down machine a session runs in. It holds a clone of the
project, the agent and your terminal. It can reach only what your administrator
allows, and it holds no password or key of yours.

## What it is not

- **Not a code host.** Garth keeps its own copy of each project. A project from
  GitHub or GitLab still has its reviews and branch protection there.
- **Not a pull-request tool.** A project hosted in Garth merges in Garth. A
  project from a git host gets its pull request on that host — open it there, or
  ask the agent to.
- **Not a place for production secrets.** A project can give sessions an API key,
  but only for the hosts you name. Production credentials belong to the deployed
  Toft app.

:::note[The admin guide]
Running Garth itself — sign-in, models, sandboxes, budgets — is in the admin
guide.
:::
